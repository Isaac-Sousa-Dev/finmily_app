import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Manager } from "./Manager";

@Entity({name: "user"})
export class User extends BaseEntity {

    @Column({type: "varchar", length: 100})
    nickname: string

    @Column({type: "varchar", length: 255}) 
    password:string

    @Column({type: "varchar", length: 15, nullable: true})
    phoneNumber: string

    @Column({type: "varchar", length: 50})
    role: string
    
}
