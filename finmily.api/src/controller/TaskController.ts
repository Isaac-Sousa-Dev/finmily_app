import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import { User } from "../entity/User";
import { open } from "fs";
import { userInfo } from "os";
import { Tree } from "typeorm";

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

        console.log(task, 'Minha tarefa');

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
        // let userAuth = request.userAuth; 

        let userAuth = {
            uid: "ff67aa8f-9459-4b61-8c94-572302561559"
        }

        const user = await AppDataSource.getRepository(User).findOne({ where: { uid: userAuth.uid } });

        const tasks = await this.taskRepository.find({ where: { userUid: userAuth.uid } })

        const currentDate = new Date();
        let dayOfWeek = currentDate.getDay();
        let allTasks = tasks;
        let taskToday: Array<any> = [];

        allTasks.forEach(task => {
            let daysOfWeek: any = task.daysOfWeek;
            if(daysOfWeek != null) {
                daysOfWeek = task.daysOfWeek.split(',');
    
                if(daysOfWeek.includes(dayOfWeek.toString())) {
                    taskToday.push(task);
                }
            }
        });

        const response = {
            userInfo: user,
            tasks: tasks,
            taskToday: taskToday
        }
        return response;
    }

    async remove(request: Request) {
        // let userAuth = request.userAuth;
        // console.log(userAuth, 'Meu userAuth');

        let userAuth = {
            role: "manager",
        }
        let { uid } = request.params;
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para remover tarefas"};
        this.isRequired(uid, "Informe o uid da tarefa");

        let taskRemoved = await this.taskRepository.findOne({
            where: {
                uid
            }
        });

        await this.taskRepository.remove(taskRemoved);
        return {message: "Tarefa removida com sucesso", taskRemoved};
    }


    async complete(request: Request) {
        const { uid } = request.params;

        const task = await this.taskRepository.findOne({where: {uid}});
        // const user = await AppDataSource.getRepository(User).findOne({where: {uid: task.userUid}});

        // let currentBalance = Number(user.balance); // Converte balance para número
        // let cost = Number(task.cost); // Converte cost para número, caso seja string;

        // await AppDataSource.getRepository(User).update({uid: task.userUid}, {balance: currentBalance + cost});

        if(task.status === "completed") {
            return {error: "Tarefa já concluída"};
        } else {
            task.status = "completed";
            await this.taskRepository.save(task);
            return {message: "Tarefa concluída com sucesso", task};
        }

    }


    async undo(request: Request) {
        const { uid } = request.params;

        const task = await this.taskRepository.findOne({where: {uid}});
        // const user = await AppDataSource.getRepository(User).findOne({where: {uid: task.userUid}});

        // let currentBalance = Number(user.balance); // Converte balance para número
        // let cost = Number(task.cost); // Converte cost para número, caso seja string;

        // await AppDataSource.getRepository(User).update({uid: task.userUid}, {balance: currentBalance - cost});

        if(task.status === "pending") {
            return {error: "Tarefa já concluída"};
        } else {
            task.status = "pending";
            await this.taskRepository.save(task);
            return {message: "Tarefa desfeita com sucesso", task};
        }

    }

    async checkedByManager(request: Request) {
        // let userAuth = request.userAuth;
        let { uid } = request.params;

        let userAuth = {
            role: "manager",
        }

        if(userAuth.role !== "manager") return {error: "Você não tem permissão para marcar tarefas como concluídas"};

        const task = await this.taskRepository.findOne({where: {uid}});
        const user = await AppDataSource.getRepository(User).findOne({where: {uid: task.userUid}});

        let currentBalance = Number(user.balance); // Converte balance para número
        let cost = Number(task.cost); // Converte cost para número, caso seja string;

        await AppDataSource.getRepository(User).update({uid: task.userUid}, {balance: currentBalance + cost});

        if(task.checkedByManager === true) {
            return {error: "Tarefa já foi checada"};
        } else {
            task.checkedByManager = true;
            await this.taskRepository.save(task);
            return {message: "Tarefa checada com sucesso", task};
        }

    }
}