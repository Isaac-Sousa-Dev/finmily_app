import { AppDataSource } from "../data-source";
import { Manager } from "../entity/Manager";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import { User } from "../entity/User";
import * as md5 from "md5";

export class ManagerController extends BaseNotification {

    private managerRepository = AppDataSource.getRepository(Manager) 
    private userRepository = AppDataSource.getRepository(User) 

    async save(request: Request) {
        let { nickname, password, phoneNumber, role } = request.body;

        this.isRequired(nickname, "O apelido é obrigatório");
        this.isRequired(password, "A senha é obrigatória");
        this.isRequired(role, "O papel do usuário é obrigatório");
        this.hasMinLen(password, 3, "A senha deve ter no mínimo 6 caracteres")
        this.hasMaxLen(password, 12, "A senha deve ter no máximo 12 caracteres")
        password = md5(password)

        const user = Object.assign(new User(), {
            nickname,
            password,
            phoneNumber,
            role
        })

        if(this.valid()) {
            let userCreated = await this.userRepository.save(user)

            const manager = Object.assign(new Manager(), {
                userUid: userCreated.uid
            })
    
            await this.managerRepository.save(manager);
            return {message: "Gerente cadastrado com sucesso", user: userCreated};
        } else {
            return {error: "Erro ao cadastrar gerente", notifications: this.allNotifications}
        }
    }   
}