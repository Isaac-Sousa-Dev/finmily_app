import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { FindOneOptions, FindOptionsWhere } from "typeorm"
import { BaseNotification } from "../notification/BaseNotification"
import * as md5 from "md5"
import config from "../configuration/config"
import { sign } from "jsonwebtoken"

export class UserController extends BaseNotification {

    private userRepository = AppDataSource.getRepository(User)
    
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
            return response.status(401).json({message: "Usuário ou senha inválidos"});
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