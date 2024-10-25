import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import { User } from "../entity/User";
import { open } from "fs";

export class TaskController extends BaseNotification {

    private taskRepository = AppDataSource.getRepository(Task);

    async save(request: Request) {

        // let userAuth = request.userAuth;
        let userAuth = {
            role: "manager",
        }
        
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para cadastrar tarefas"};

        let { title, description, cost, happiness, status, user, daysOfWeek } = request.body;

        this.isRequired(title, "O título é obrigatório");
        this.isRequired(status, "O status é obrigatório");
        this.isRequired(user, "O colaborador é obrigatório");
        this.hasMinLen(title, 3, "O título deve ter no mínimo 3 caracteres")
        this.hasMaxLen(title, 100, "O título deve ter no máximo 100 caracteres")

        const task = Object.assign(new Task(), {
            title,
            description,
            cost,
            happiness,
            status,
            userUid: user,
            daysOfWeek,
            // openByUserUid: userAuth.uid
            openByUserUid: "2c7e8ffc-b2ee-4d3e-89c2-779fef33a5d7"
        })

        if(this.valid()) {
            let taskCreated = await this.taskRepository.save(task);
            return {message: "Tarefa cadastrada com sucesso", task: taskCreated};
        } else {
            return {error: "Erro ao cadastrar tarefa", notifications: this.allNotifications}
        }
    }
    

    async update(request: Request) {
        let userAuth = request.userAuth;
        let { uid } = request.params;
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para atualizar tarefas"};

        let { title, description, cost, happiness, status, user, everyDay, dayOfWeek } = request.body;
        this.isRequired(uid, "Informe o uid da tarefa");

        const task = Object.assign(new Task(), {
            uid,
            title,
            description,
            cost,
            happiness,
            status,
            userUid: user,
            everyDay,
            dayOfWeek,
            openByUserUid: userAuth.uid
        })

        if(this.valid()) {
            let taskUpdated = await this.taskRepository.save(task);
            return {message: "Tarefa atualizada com sucesso", taskUpdated};
        } else {
            return {error: "Erro ao atualizar tarefa", notifications: this.allNotifications}
        }
    }

    async myTasks(request: Request) {
        let userAuth = request.userAuth; 
        const tasks = await this.taskRepository.find({ where: { userUid: userAuth.uid } }) // Buscar tareafas de um colaborador
        return tasks;
    }
}