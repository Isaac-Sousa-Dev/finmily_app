import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Behavior } from "./entity/Behavior"
import { Task } from "./entity/Task"

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
        Task,
        Behavior,
    ],
    migrations: [],
    subscribers: [],
})
