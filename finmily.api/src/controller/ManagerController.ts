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

        let userAuth = request.userAuth;

        let currentDate = new Date();   
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        const startOfMonth = new Date(year, month - 1, 1); // Primeiro dia do mês
        const endOfMonth = new Date(year, month, 0, 23, 59, 59); // Último dia do mês, 23:59:59

        const allTasksByManager = await this.taskRespository.find({ 
            where: { 
                openByUserUid: userAuth.uid,
                createdAt: Between(startOfMonth, endOfMonth),
            },
            
        });


        const allCollaborators = await this.userRepository.find({ where: { managerUid: userAuth.uid } });
        let dataForReturn = {
            'tasksQuantity': allTasksByManager.length,
            'collaboratorsQuantity': allCollaborators.length,
            'behaviorsQuantity': 0,
        }

        return {message: "Dados carregados com sucesso", data: dataForReturn};

    }


    async tasks(request: Request) {
        let userAuth = request.userAuth;

        

        const allCollaborators = await this.userRepository.find({ 
            where: { managerUid: userAuth.uid },
            select: ['uid', 'nickname', 'balance']
        });

        
        let dataForReturn = {
            'totalPayable': 100,
            'collaborators': allCollaborators
        }

        return {
            'message': 'Dados carregados com sucesso',
            'data': dataForReturn
        }

    }

    
    async tasksByCollaborator(request: Request){

        let { userUid } = request.params;

        const collaborator = await this.userRepository.findOne({ where: { uid: userUid }, select: ['uid', 'nickname', 'balance'] });

        // Defina o intervalo de tempo para o dia atual
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

        const allTasksByCollaborator = await this.taskRespository.find({
            where: { 
                userUid: userUid,
                createdAt: Between(startOfDay, endOfDay)
            },
            select: ['uid', 'title', 'description', 'cost', 'status']
        });

        let tasksPending: Array<any> = [];
        let tasksCompleted: Array<any> = [];
        let taskToday = allTasksByCollaborator;

        allTasksByCollaborator.forEach((task) => {
            if(task.status === 'pending') {
                tasksPending.push(task);
            } else if(task.status === 'completed') {
                tasksCompleted.push(task);
            }
        })

        let dataForReturn = {
            'collaborator': collaborator,
            'tasksPending': tasksPending,
            'tasksCompleted': tasksCompleted,
            'tasksToday': taskToday
        }

        return {
            'message': 'Dados carregados com sucesso',
            'data': dataForReturn
        }
    }
}