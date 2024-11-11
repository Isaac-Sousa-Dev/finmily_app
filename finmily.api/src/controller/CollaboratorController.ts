import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { BaseNotification } from "../notification/BaseNotification";
import { Request } from "express";
import * as md5 from "md5";

export class CollaboratorController extends BaseNotification {

    private userRepository = AppDataSource.getRepository(User);
    private taskRepository = AppDataSource.getRepository(Task);

    async save(request: Request) {

        let userAuth = request.userAuth;
        
        if(userAuth.role !== "manager") return {error: "Você não tem permissão para cadastrar colaboradores"};
        
        let { nickname, password, role, age, phoneNumber } = request.body;

        // const existNickname = await this.userRepository.findOne({ where: { nickname } })
        // if(existNickname) this.AddNotification("Já existe um usuário com este apelido");

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
            age,
            phoneNumber,
            managerUid: userAuth.uid
        })

        if(this.valid()) {
            let userCreated = await this.userRepository.save(user)

            return {message: "Colaborador cadastrado com sucesso", user: userCreated};
        } else {
            return {error: "Erro ao cadastrar colaborador", notifications: this.allNotifications}
        }

    }

    async remove(request: Request) {
        let { uid } = request.params;
        let child = await this.userRepository.find({ where: { uid } });
        let tasksByCollaborator = await this.taskRepository.find({ where: { userUid: uid } });

        tasksByCollaborator.forEach(async task => {
            await this.taskRepository.update(task.uid, { deleted: true });
        })

        if(child) {
            await this.userRepository.update(uid, { deleted: true });
            return {success: "Usuário deletado com sucesso"};
        } else {
            return {error: "Usuário não encontrado"};
        }
    }


    async update(request: Request) {
        let { uid } = request.params;
        let { nickname, role, age, phoneNumber } = request.body;

        const user = await this.userRepository.findOne({ where: { uid } });
        if(!user) return {error: "Usuário não encontrado"};

        user.nickname = nickname;
        // user.password = md5(password);
        user.role = role;
        user.age = age;
        user.phoneNumber = phoneNumber;

        await this.userRepository.save(user);
        return {message: "Usuário atualizado com sucesso", user};
    }

}