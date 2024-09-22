import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "manager"})
export class Manager {

    @PrimaryGeneratedColumn("uuid")
    uid: string;

    @Column({type: "varchar", length: 255, nullable: true})
    photo: string;

    @Column({nullable: true})
    age: number;

    @Column({type: "varchar", length: 255})
    userUid: string;

    @Column({default: 0, nullable: true})
    balance: number;

}