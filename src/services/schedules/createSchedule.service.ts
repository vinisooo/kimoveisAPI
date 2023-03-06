import { User } from './../../entities/users.entities';
import { RealEstate } from './../../entities/realEstate.entities';
import { AppDataSource } from './../../data-source';
import { Schedule } from './../../entities/schedulesUsersProperties.entities';
import { Repository } from 'typeorm';
import { AppError } from '../../errors';
import { iScheduleReqSchema } from '../../interfaces/schedules.interfaces';

export const postScheduleService = async (payload: iScheduleReqSchema, userId: number) => {
    const schedulesRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const realEstatesRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const usersRepo: Repository<User> = AppDataSource.getRepository(User);

    const date = payload.date;
    const formatedDate = new Date(date);
    const day = formatedDate.getDay();

    if(day === 0 || day === 6){
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    const hour = payload.hour;
    const formatedHour = hour.split(":");

    if(parseInt(formatedHour[0]) < 8 || parseInt(formatedHour[0]) > 18){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }
    if(parseInt(formatedHour[1]) < 0 || parseInt(formatedHour[1]) > 59){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    const foundUser = await usersRepo.findOneBy({
        id: userId
    })

    const foundRealEstate = await realEstatesRepo.findOneBy({
        id: payload.realEstateId
    })

    if(!foundRealEstate){
        throw new AppError("RealEstate not found", 404)
    }

    let newSchemaReq = {
        date: date,
        hour: hour,
        user: foundUser!,
        realEstate: foundRealEstate
    }

    const createdSchedule = schedulesRepo.create(newSchemaReq as object);

    const foundUserSchedule = await schedulesRepo.createQueryBuilder("schedule")
    .where("schedule.user.id = :userId", {userId : createdSchedule.user.id})
    .andWhere("schedule.date = :date", {date: createdSchedule.date})
    .andWhere("schedule.hour = :hour", {hour: createdSchedule.hour})
    .getOne();

    if(foundUserSchedule){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409);
    }

    const foundSchedule = await schedulesRepo.createQueryBuilder("schedule")
    .where("schedule.realEstateId = :id", {id : payload.realEstateId})
    .andWhere("schedule.date = :date", {date: createdSchedule.date})
    .andWhere("schedule.hour = :hour", {hour: createdSchedule.hour})
    .getOne();

    if(foundSchedule){
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    }

    await schedulesRepo.save(createdSchedule);

    return { message: "Schedule created" };
}
