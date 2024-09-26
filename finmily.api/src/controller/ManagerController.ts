import { AppDataSource } from "../data-source";
import { BaseNotification } from "../notification/BaseNotification";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as md5 from "md5";
import { Task } from "../entity/Task";

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
    
    
    async home(request: Request, response: Response) {

        let userAuth = request.userAuth;
        const allTasksByManager = await this.taskRespository.find({ where: { openByUserUid: userAuth.uid } });
        const allCollaborators = await this.userRepository.find({ where: { managerUid: userAuth.uid } });

        // TODO: Implementar funcionalidade que pegue somente os dados do mêss atual
        let dataForReturn = {
            'tasksQuantity': allTasksByManager.length,
            'collaboratorsQuantity': allCollaborators.length,
            'behaviorsQuantity': 0,
        }

        return {message: "Dados carregados com sucesso", data: dataForReturn};

    }


    async tasks(request: Request, response: Response) {
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

        const allTasksByCollaborator = await this.taskRespository.find({
            where: { userUid: userUid },
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