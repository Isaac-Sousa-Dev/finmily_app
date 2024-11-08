import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BalanceHistory } from "../entity/BalanceHistory";

export class ReportController {
    async getMonthlyReport(request: Request, response: Response) {
        const { userUid } = request.params;
        const balanceHistoryRepository = AppDataSource.getRepository(BalanceHistory);

        // Busca o histórico de saldo do usuário, ordenado por data em ordem decrescente
        const monthlyReport = await balanceHistoryRepository.find({
            where: { userUid },
            order: { month: "DESC" }
        });

        // Retorna o relatório em formato JSON
        return response.json({
            userUid,
            report: monthlyReport.map(entry => ({
                month: entry.month.toLocaleDateString("pt-BR", { year: 'numeric', month: 'long' }),
                balance: entry.balance
            }))
        });
    }
}
