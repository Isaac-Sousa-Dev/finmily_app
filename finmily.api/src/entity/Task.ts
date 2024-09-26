import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({nullable: true})
    dayOfWeek: number;  

    @Column({type: "varchar", length: 15})
    status: string; // pending or completed

    @Column({type: "varchar", length: 255})
    openByUserUid: string;  

}