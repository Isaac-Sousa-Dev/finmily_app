import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Collaborator } from "./Collaborator";
import { User } from "./User";

@Entity({name: "task"})
export class Task {

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

    @ManyToOne(() => User)
    user: string;

    @Column({type: "varchar", length: 15})
    status: string; // pending, completed, or canceled

}