import { Category } from './categories.entities';
import { Address } from './addresses.entities';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, ManyToOne, JoinColumn } from "typeorm";

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "boolean", default: true})
    sold: false

    @Column({type: "decimal", precision: 12, scale: 2, default: 0})
    value: number | string

    @Column({type: "integer"})
    size: number

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @OneToOne(() => Address)
    @JoinColumn({name: "addressId"})
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate, {nullable: true})
    category: Category | null
}
