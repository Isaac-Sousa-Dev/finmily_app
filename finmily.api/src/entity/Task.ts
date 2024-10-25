import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity({name: "task"})
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    uid: string;

    @Column({type: "varchar", length: 255})
    title: string;

    @Column({type: "varchar", length: 1000, nullable: true})
    description: string;

    @Column({nullable: true})
    cost: number;

    @Column({nullable: true})
    happiness: number;  

    @Column({type: "varchar", length: 255})
    userUid: string;

    @Column({nullable: true})
    everyDay: boolean;

    @Column({type: "varchar", length: 255, nullable: true})
    daysOfWeek: string;  

    @Column({type: "varchar", length: 15})
    status: string; // pending or completed

    @Column({type: "varchar", length: 255})
    openByUserUid: string;  

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'userUid' })  // Nome da coluna na tabela de `Task`
    user: User;

}