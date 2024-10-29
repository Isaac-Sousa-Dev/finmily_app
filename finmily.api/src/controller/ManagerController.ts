import { AppDataSource } from "../data-source";
import { BaseNotification } from "../notification/BaseNotification";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as md5 from "md5";
import { Task } from "../entity/Task";
import { Between } from "typeorm";

export class ManagerController extends BaseNotification {

    private userRepository = AppDataSource.getRepository(User) 
    private taskRespository = AppDataSource.getRepository(Task)

    async save(request: Request) {
        let { nickname, password, phoneNumber, role } = request.body;

        const existNickname = await this.userRepository.findOne({ where: { nickname } });
        if(existNickname) this.AddNotification("Já existe um usuário com este apelido");

        this.isRequired(nickname, "O apelido é obrigatório");
        this.isRequired(password, "A senha é obrigatória");
        this.isRequired(role, "O papel do usuário é obrigatório");
        this.hasMinLen(password, 6, "A senha deve ter no mínimo 6 caracteres")
        this.hasMaxLen(password, 12, "A senha deve ter no máximo 12 caracteres")
        password = md5(password)

        const user = Object.assign(new User(), {
            nickname,
            password,
            phoneNumber,
            role,

        })

        if(this.valid()) {
            let userCreated = await this.userRepository.save(user);
            return {message: "Gerente cadastrado com sucesso", user: userCreated};
        } else {
            return {error: "Erro ao cadastrar gerente", notifications: this.allNotifications}
        }
    }  
    
    
    async home(request: Request) {

        // let userAuth = request.userAuth;

        const userAuthUid = '2c7e8ffc-b2ee-4d3e-89c2-779fef33a5d7';

        let currentDate = new Date();   
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        const startOfMonth = new Date(year, month - 1, 1); // Primeiro dia do mês
        const endOfMonth = new Date(year, month, 0, 23, 59, 59); // Último dia do mês, 23:59:59

        const allTasksByManager = await this.taskRespository.find({ 
            where: { 
                // openByUserUid: userAuth.uid,
                openByUserUid: userAuthUid,
                createdAt: Between(startOfMonth, endOfMonth),
            },
        });


        // const allCollaborators = await this.userRepository.find({ where: { managerUid: userAuth.uid } });
        const allCollaborators = await this.userRepository.find({ where: { managerUid: userAuthUid } });
        let dataForReturn = {
            'tasksQuantity': allTasksByManager.length,
            'collaboratorsQuantity': allCollaborators.length,
            'behaviorsQuantity': 0,
        }

        return {message: "Dados carregados com sucesso", data: dataForReturn};

    }


    async tasks(request: Request) {
        // let userAuth = request.userAuth;

        const userAuthUid = '2c7e8ffc-b2ee-4d3e-89c2-779fef33a5d7'; 


        const allTasksOpenByManager = await this.taskRespository.find({
            where: { 
                // openByUserUid: userAuth.uid,
                openByUserUid: userAuthUid,
                // status: 'pending'
            },
            select: ['uid', 'title', 'description', 'cost', 'daysOfWeek', 'status', 'everyDay'],
            relations: ['user']
        })
        
        let dataForReturn = {
            'totalPayable': 100,
            'tasks': allTasksOpenByManager,
        }

        return {
            'message': 'Dados carregados com sucesso',
            'data': dataForReturn
        }

    }

    
    async tasksByCollaborator(request: Request){

        let { userUid } = request.params;

        const collaborator = await this.userRepository.findOne({ where: { uid: userUid }, select: ['uid', 'nickname', 'balance'] });

        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

        const dayOfWeek = currentDate.getDay();
        console.log(dayOfWeek, 'Dia da semana');

        const allTasksByCollaborator = await this.taskRespository.find({
            where: { 
                userUid: userUid,
                // createdAt: Between(startOfDay, endOfDay),
                // daysOfWeek: dayOfWeek.toString()
            },
            select: ['uid', 'title', 'description', 'cost', 'status', 'daysOfWeek']
        });

        console.log(allTasksByCollaborator, 'Tarefas do colaborador');

        let allTasks = allTasksByCollaborator;
        let tasksPending: Array<any> = [];
        let tasksCompleted: Array<any> = [];
        let taskToday: Array<any> = [];

        console.log(allTasks, 'Todas as tarefas');

        allTasks.forEach(task => {
            console.log(task, 'Task');

            let daysOfWeek: any = task.daysOfWeek;
            daysOfWeek = task.daysOfWeek.split(',');

            console.log(daysOfWeek, 'Dias da semana');

            // if(task.daysOfWeek.includes(dayOfWeek.toString())) {
            //     taskToday.push(task);
            // }

            if(task.status === 'pending') {
                tasksPending.push(task);
            } else if(task.status === 'completed') {
                tasksCompleted.push(task);
            }
        })

        // allTasksByCollaborator.forEach((task) => {

        //     if(task.daysOfWeek.includes(dayOfWeek.toString())) {
        //         taskToday.push(task);
        //     }

        //     if(task.status === 'pending') {
        //         tasksPending.push(task);
        //     } else if(task.status === 'completed') {
        //         tasksCompleted.push(task);
        //     }
        // })

        let dataForReturn = {
            'collaborator': collaborator,
            'tasksPending': tasksPending,
            'tasksCompleted': tasksCompleted,
            'tasksToday': taskToday,
            'allTasks': allTasks    
        }

        return {
            'message': 'Dados carregados com sucesso',
            'data': dataForReturn
        }
    }


    async childrensByManager(request: Request) {
        // let userAuth = request.userAuth;

        const userAuthUid = '2c7e8ffc-b2ee-4d3e-89c2-779fef33a5d7';

        const allChildrensByManager = await this.userRepository.find(
            { 
                where: { managerUid: userAuthUid },
                select: ['uid', 'nickname', 'phoneNumber', 'role', 'balance'],
            }
        );

        return {
            'message': 'Dados carregados com sucesso',
            'data': allChildrensByManager
        }
    }
}