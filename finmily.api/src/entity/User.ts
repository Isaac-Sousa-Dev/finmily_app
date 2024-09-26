import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

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

    @Column({type: "varchar", length: 255, nullable: true}) 
    managerUid: string

    @Column({type: "varchar", length: 255, nullable: true})
    photo: string

    @Column({nullable: true})
    age: number;

    @Column({default: 0, type: "decimal", precision: 10, scale: 2})
    balance: number;
    
}
