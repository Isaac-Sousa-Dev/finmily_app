import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import { User } from "../entity/User";

export class TaskController extends BaseNotification {

    private taskRepository = AppDataSource.getRepository(Task);

    async save(request: Request) {

        let userAuth = request.userAuth;
        
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para cadastrar tarefas"};

        let { title, description, cost, happiness, status, user } = request.body;

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
            userUid: user
        })

        if(this.valid()) {
            let taskCreated = await this.taskRepository.save(task);
            return {message: "Tarefa cadastrada com sucesso", task: taskCreated};
        } else {
            return {error: "Erro ao cadastrar tarefa", notifications: this.allNotifications}
        }
    }

    async myTasks(request: Request) {
        let userAuth = request.userAuth; 
        const tasks = await this.taskRepository.find({ where: { userUid: userAuth.uid } }) // Buscar tareafas de um colaborador
        return tasks;
    }
}