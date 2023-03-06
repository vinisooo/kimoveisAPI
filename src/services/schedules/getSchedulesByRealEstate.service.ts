import { Repository } from 'typeorm';
import { RealEstate } from './../../entities/realEstate.entities';
import { AppDataSource } from './../../data-source';
import { AppError } from '../../errors';

export const getSchedulesByRealEstateService = async(realEstateId: number) => {
    const realEstatesRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const schedulesFromRealEstate = await realEstatesRepo.findOne({
        relations:{
            address: true,
            category: true,
            schedules: {
                user: true
            }
        },
        where:{
            id: realEstateId
        }
    });

    if(!schedulesFromRealEstate){
        throw new AppError("RealEstate not found", 404);
    }

    return schedulesFromRealEstate;
}
