import { User } from './users.entities';
import { RealEstate } from './realEstate.entities';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules_users_properties")
export class Schedule{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date"})
    date: string

    @Column({type: "time"})
    hour: string

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User
}
