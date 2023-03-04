import { Category } from './../../entities/categories.entities';
import { Address } from './../../entities/addresses.entities';
import { AppDataSource } from './../../data-source';
import { RealEstate } from './../../entities/realEstate.entities';
import { Repository } from 'typeorm';
import { iRealEstatePostReq } from '../../interfaces/realEstates.interfaces';
import { AppError } from '../../errors';
import { addressSchemaPostReq, realEstateSchemaPostNoCategoryId } from '../../schemas/realEstates.schemas';

export const postRealEstateService = async(payload: iRealEstatePostReq) => {
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
        number: !payload.address.number ? "" : payload.address.number
    })

    if(foundAddress){
        throw new AppError("Address already exists", 409);
    }

    const addedAddress = addressesRepo.create(address);
    await addressesRepo.save(addedAddress);

    let foundCategory = null;

    if(payload.category){
        foundCategory = await categoriesRepo.findOne({
            where: {
                id: payload.category
            }
        });
    }

    const addedRealEstate = realEstateRepo.create(payload as RealEstate);

    await realEstateRepo.save(addedRealEstate);

    let joinedRealEstate = {
        ...addedRealEstate,
        address: addedAddress,
        category: foundCategory
    }

    return joinedRealEstate
}
