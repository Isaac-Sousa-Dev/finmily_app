// BalanceHistory.ts (Nova entidade)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({name: "balance_history"})
export class BalanceHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userUid: string;

    @Column("decimal", { precision: 10, scale: 2 })
    balance: number;

    @Column({ type: "date" })
    month: Date; // Usa a data para marcar o mês correspondente

    @ManyToOne(() => User, user => user.balanceHistories)
    user: User;
}