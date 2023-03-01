import { User } from './users.entities';
import { RealEstate } from './realEstate.entities';
import { Entity, Column, ManyToOne } from "typeorm";

@Entity("schedules_users_properties")
export class Schedule{
    @Column()
    date: Date

    @Column({type: "time"})
    hour: Date

    @ManyToOne(() => RealEstate)
    realEstateId: RealEstate

    @ManyToOne(() => User)
    userId: User
}
