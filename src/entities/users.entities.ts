import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate, AfterLoad, AfterInsert } from "typeorm";
import { hashSync } from "bcryptjs";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45})
    name: string

    @Column({type: "varchar", unique: true, length: 45})
    email: string

    @Column({default: false})
    admin: boolean

    @Column({type: "varchar", length: 120})
    password: string

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @DeleteDateColumn({type: "date"})
    deletedAt: string

    encryptInsert()
    {
        this.password = hashSync(this.password, 10)
    }

    @BeforeUpdate()
    async encryptUpdate()
    {
        this.password = hashSync(this.password, 10)
    }
}
