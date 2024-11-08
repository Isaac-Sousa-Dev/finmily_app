import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BalanceHistory } from "../entity/BalanceHistory";
import { report } from "process";
import { User } from "../entity/User";

export class ReportController {
    async getMonthlyReport(request: Request, response: Response) {
        const { userUid } = request.params;
        const userRepository = AppDataSource.getRepository(User);
        const balanceHistoryRepository = AppDataSource.getRepository(BalanceHistory);


        const user = await userRepository.find({ where: { uid: userUid }, select: ["uid", "nickname", "role", "balance"] });
        

        //Busca o histórico de saldo do usuário, ordenado por data em ordem decrescente
        let monthlyReport = await balanceHistoryRepository.find({
            where: { userUid },
            order: { month: "DESC" }
        });

        let report = monthlyReport.map(entry => ({
            month: new Date(entry.month).toLocaleDateString("pt-BR", { year: 'numeric', month: 'long' }),
            balance: entry.balance
        }));

        return {
            user: user,
            report: report
        }
    }
}
