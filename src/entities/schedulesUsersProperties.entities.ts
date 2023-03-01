import { User } from './users.entities';
import { RealEstate } from './realEstate.entities';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules_users_properties")
export class Schedule{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column({type: "time"})
    hour: Date

    @ManyToOne(() => RealEstate)
    realEstateId: RealEstate

    @ManyToOne(() => User)
    userId: User
}
