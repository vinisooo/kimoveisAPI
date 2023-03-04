import { RealEstate } from './realEstate.entities';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45, unique: true})
    name: string

    @OneToMany(() => RealEstate,(realEstate) => realEstate.category)
    realEstate: RealEstate[]
}
