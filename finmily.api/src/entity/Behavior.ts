import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Collaborator } from "./Collaborator";

@Entity({name: "behavior"})
export class Behavior extends BaseEntity {

    @Column({type: "varchar", length: 500})
    description: string;

    @Column({type: "varchar", length: 15})
    transactionType: string; // credit or debit

    @Column({nullable: true})
    value: number;

    @ManyToOne(() => Collaborator)
    collaborator: Collaborator;

}