
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45})
    street: string

    @Column({type: "varchar", length: 8})
    zipCode: string

    @Column({type: "varchar", length: 6, nullable: true})
    number: string

    @Column({type: "varchar", length: 20})
    city: string

    @Column({type: "varchar", length: 2})
    state: string

}
