import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import config from "./configuration/config"
const cors = require('cors');
var cron = require("node-cron"); 

import auth from "./middleware/auth"
import { Task } from "./entity/Task"
import { User } from "./entity/User"
import { BalanceHistory } from "./entity/BalanceHistory";

// create express app
const app = express()
app.use(bodyParser.json())
// TODO: Habilitar o middleware de autenticação
// app.use(auth)

app.use(cors());

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})


// Função que define a tarefa a ser executada diariamente
async function resetTasksDaily() {
    const taskRepository = AppDataSource.getRepository(Task);

    // Busca todas as tarefas que precisam ser resetadas
    const tasks = await taskRepository.find();
    tasks.forEach(task => {
        task.status = 'pending';
        task.checkedByManager = false;
    });

    // Salva as alterações em todas as tarefas
    await taskRepository.save(tasks);
    console.log("Tasks updated to pending status at midnight.");
}
// Agenda a execução da função para todos os dias à meia-noite
cron.schedule('0 0 * * *', async () => {
    try {
        await resetTasksDaily();
    } catch (error) {
        console.error("Error updating tasks at midnight:", error);
    }
});



// Função para atualizar o balance de todos os usuários
async function updateMonthlyBalances() {
    
    const userRepository = AppDataSource.getRepository(User);
    const balanceHistoryRepository = AppDataSource.getRepository(BalanceHistory);

    // Buscando todos os usuários para atualizar o balance
    const users = await userRepository.find();

    // Obtém a data do final do mês para marcar o mês no histórico
    const endOfMonth = new Date();
    endOfMonth.setDate(1); // Seta para o primeiro dia do mês
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Avança para o próximo mês
    endOfMonth.setDate(0); // Recuo para o último dia do mês atual

    for (const user of users) {
        // Cria um registro de histórico com o balance atual do usuário
        const balanceHistory = new BalanceHistory();
        balanceHistory.userUid = user.uid;
        balanceHistory.balance = user.balance;
        balanceHistory.month = endOfMonth;

        await balanceHistoryRepository.save(balanceHistory);

        // Zera o balance atual (ou ajusta conforme sua lógica)
        user.balance = 0;
    }

    // Salva as alterações no banco de dados
    await userRepository.save(users);
    console.log("Balances updated for all users on the first day of the month.");
}
// Agenda a execução da função para o primeiro dia de cada mês à meia-noite
cron.schedule('0 0 1 * *', async () => {
    try {
        await updateMonthlyBalances();
    } catch (error) {
        console.error("Error updating balances:", error);
    }
});


// Agenda a execução da função para cada 15 segundos
// cron.schedule('*/15 * * * * *', async () => {
//     try {
//         await updateMonthlyBalances();
//     } catch (error) {
//         console.error("Error updating tasks:", error);
//     }
// });


// Agenda a execução da função para cada 1 hora
// cron.schedule('0 * * * *', async () => {
//     try {
//         await resetTasksDaily();
//     } catch (error) {
//         console.error("Error updating tasks:", error);
//     }
// });


app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Server started on http://localhost:${config.port}`)

    try {
        await AppDataSource.initialize();
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error", error)
    }
})
