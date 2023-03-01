import { Category } from './categories.entities';
import { Address } from './addresses.entities';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, ManyToOne } from "typeorm";

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "boolean", default: true})
    sold: false

    @Column({type: "decimal", precision: 12, scale: 2})
    value: number

    @Column({type: "integer"})
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Address)
    @JoinTable()
    addressId: number

    @ManyToOne(() => Category)
    categoryId: number
}
