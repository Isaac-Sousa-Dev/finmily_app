import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BalanceHistory } from "../entity/BalanceHistory";
import { report } from "process";

export class ReportController {
    async getMonthlyReport(request: Request, response: Response) {
        const { userUid } = request.params;
        const balanceHistoryRepository = AppDataSource.getRepository(BalanceHistory);

        

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
            userUid,
            report: report
        }
    }
}
