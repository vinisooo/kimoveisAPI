import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, OneToMany, BeforeUpdate} from "typeorm";
import { hashSync } from "bcryptjs";
import { Schedule } from "./schedulesUsersProperties.entities";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45})
    name: string

    @Column({type: "varchar", unique: true, length: 45})
    email: string

    @Column({default: false})
    admin: boolean = false

    @Column({type: "varchar", length: 120})
    password: string

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @DeleteDateColumn({type: "date"})
    deletedAt: string

    @OneToMany(() => Schedule, (schedules) => schedules.user)
    schedules: Schedule[]

    @BeforeInsert()
    @BeforeUpdate()
    encryptInsert()
    {
        this.password = hashSync(this.password, 10)
    }
}
