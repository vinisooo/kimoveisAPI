import { Repository } from 'typeorm';
import { RealEstate } from './../../entities/realEstate.entities';
import { AppDataSource } from './../../data-source';


export const getAllRealEstatesService = async() => {
    const realEstatesRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const allRealEstatesRepo = await realEstatesRepo
    .createQueryBuilder("estates")
    .leftJoinAndSelect("estates.address", "address")
    .getMany();

    return allRealEstatesRepo;
}
