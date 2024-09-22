import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Behavior } from "./entity/Behavior"
import { Manager } from "./entity/Manager"
import { Task } from "./entity/Task"
import { Collaborator } from "./entity/Collaborator"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "finmily_db",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Manager,
        Collaborator,
        Task,
        Behavior,
    ],
    migrations: [],
    subscribers: [],
})
