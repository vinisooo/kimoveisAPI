import { Category } from './../../entities/categories.entities';
import { Address } from './../../entities/addresses.entities';
import { AppDataSource } from './../../data-source';
import { RealEstate } from './../../entities/realEstate.entities';
import { Repository } from 'typeorm';
import { iRealEstateSchemaBody } from '../../interfaces/realEstates.interfaces';
import { AppError } from '../../errors';
import { addressSchemaPostReq } from '../../schemas/realEstates.schemas';

export const postRealEstateService = async(payload: iRealEstateSchemaBody): Promise<RealEstate> => {
    const addressesRepo: Repository<Address> = AppDataSource.getRepository(Address);
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const address: object = addressSchemaPostReq.parse(payload.address);
    const {street, zipCode, city, state} = payload.address;

    const foundAddress = await addressesRepo.findOneBy({
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        number: payload.address.number ? payload.address.number! : null!
    })

    if(foundAddress){
        throw new AppError("Address already exists", 409);
    }

    const addedAddress = addressesRepo.create(address);
    await addressesRepo.save(addedAddress);

    const foundCategory = await categoriesRepo.findOne({
        where: {
            id: payload.categoryId ? payload.categoryId : null!
        }
    });

    const joinedRealEstateReq = {
        value: payload.value,
        size: payload.size,
        address: addedAddress,
        category: foundCategory
    }

    const addedRealEstate = realEstateRepo.create(joinedRealEstateReq);

    await realEstateRepo.save(addedRealEstate);

    // let joinedRealEstate = {
    //     ...joinedRealEstateReq,
    //     ...addedRealEstate,
    //     category: {...foundCategory},
    //     address: {...addedAddress}
    // }
    // console.log("==========JOINED REAL ESTATE====", joinedRealEstate)

    return addedRealEstate
}
