import { Category } from './categories.entities';
import { Address } from './addresses.entities';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Schedule } from './schedulesUsersProperties.entities';

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "boolean", default: true})
    sold: boolean = false

    @Column({type: "decimal", precision: 12, scale: 2, default: 0})
    value: number | string

    @Column({type: "integer"})
    size: number

    @CreateDateColumn({type: "date"})
    createdAt: string | Date

    @UpdateDateColumn({type: "date"})
    updatedAt: string | Date

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate, {nullable: true})
    category: Category | null

    @OneToMany(() => Schedule, (schedules)=> schedules.realEstate)
    schedules: Schedule[]
}
