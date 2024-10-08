import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import * as md5 from "md5";

export class CollaboratorController extends BaseNotification {

    private userRepository = AppDataSource.getRepository(User);

    async save(request: Request) {

        let userAuth = request.userAuth;
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para cadastrar colaboradores"};
        
        let { nickname, password, role } = request.body;

        const existNickname = await this.userRepository.findOne({ where: { nickname } })
        if(existNickname) this.AddNotification("Já existe um usuário com este apelido");

        this.isRequired(nickname, "O apelido é obrigatório");
        this.isRequired(password, "A senha é obrigatória");
        this.isRequired(role, "O papel do usuário é obrigatório");
        this.hasMinLen(password, 3, "A senha deve ter no mínimo 6 caracteres")
        this.hasMaxLen(password, 12, "A senha deve ter no máximo 12 caracteres")

        password = md5(password)
        const user = Object.assign(new User(), {
            nickname,
            password,
            role,
            managerUid: userAuth.uid
        })

        if(this.valid()) {
            let userCreated = await this.userRepository.save(user)

            return {message: "Colaborador cadastrado com sucesso", user: userCreated};
        } else {
            return {error: "Erro ao cadastrar colaborador", notifications: this.allNotifications}
        }

    }

}