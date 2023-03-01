import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 45})
    name: string

    @Column({type: "varchar", unique: true, length: 45})
    email: string

    @Column()
    admin: boolean

    @Column({type: "varchar", length: 120})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeInsert()
    async encryptInsert()
    {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeUpdate()
    async encryptUpdate()
    {
        this.password = await bcrypt.hash(this.password, 10)
    }
}
