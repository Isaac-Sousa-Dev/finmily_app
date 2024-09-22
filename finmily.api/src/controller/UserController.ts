import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { FindOneOptions, FindOptionsWhere } from "typeorm"
import { BaseNotification } from "../notification/BaseNotification"
import { ManagerController } from "./ManagerController"
import { CollaboratorController } from "./CollaboratorController"
import * as md5 from "md5"
import config from "../configuration/config"
import { sign } from "jsonwebtoken"

export class UserController extends BaseNotification {

    private userRepository = AppDataSource.getRepository(User)
    private managerController = new ManagerController()
    private collaboratorController = new CollaboratorController()
    
    constructor() {
        super()   
    }

    async auth(request: Request, response: Response, next: NextFunction) {
        let { nickname, password} = request.body;

        if(!nickname || !password) {
            return {status: 400, message: 'Informe o apelido e a senha para autenticação'};
        }

        let user = await this.userRepository.findOneBy({
            nickname: nickname,
            password: md5(password)
        })

        if(user) {
            let _payload = {
                uid: user.uid,
                nickname: user.nickname,
                role: user.role
            }

            return {
                status: 200,
                message: "Usuário autenticado com sucesso",
                userAuth: _payload,
                token: sign({
                    ..._payload,
                    tm: new Date().getTime()
                }, config.secretKey)
            }
        } else {
            return {status: 404, message: 'Usuário ou senha inválidos'};
        }


    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const uid = request.params.id

        const findOptions: FindOneOptions<User> = {
            where: {
                uid: uid,
            } as FindOptionsWhere<User>,
        };  

        const user = await this.userRepository.findOne(findOptions)

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     let { name, password, phoneNumber, role } = request.body;

    //     this.isRequired(name, "O nome é obrigatório");
    //     this.isRequired(password, "A senha é obrigatória");
    //     this.isRequired(role, "O papel do usuário é obrigatório");
    //     this.hasMinLen(password, 3, "A senha deve ter no mínimo 6 caracteres")
    //     this.hasMaxLen(password, 12, "A senha deve ter no máximo 12 caracteres")
    //     password = md5(password)

    //     const user = Object.assign(new User(), {
    //         name,
    //         password,
    //         phoneNumber,
    //         role
    //     })

    //     if(this.valid()) {
    //         let userCreated = await this.userRepository.save(user)
            
    //         if(role == "manager") {
    //             this.managerController.save(userCreated.uid);
    //         } else {
    //             this.collaboratorController.save(userCreated.uid, "teste"); // TODO: Pegar o uid do manager (localStorage)
    //         }

    //         return {
    //             status: 200,
    //             message: "Usuário cadastrado com sucesso"
    //         }

    //     } else {
    //         return {
    //             status: 400,
    //             errors: this.allNotifications
    //         }
    //     }

    // }

    async remove(request: Request, response: Response, next: NextFunction) {
        const uid = request.params.id

        const findOptions: FindOneOptions<User> = {
            where: {
                uid: uid,
            } as FindOptionsWhere<User>,
        };  

        let userToRemove = await this.userRepository.findOne(findOptions)

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }   

}