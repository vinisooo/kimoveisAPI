
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45, unique: true})
    name: string
}
