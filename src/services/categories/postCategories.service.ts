import { iCategoryReq } from './../../interfaces/categories.interfaces';
import { AppDataSource } from './../../data-source';
import { Category } from './../../entities/categories.entities';
import { Repository } from 'typeorm';
import { AppError } from '../../errors';

export const postCategoryService = async(payload: iCategoryReq): Promise<Category> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const foundCategoryByName = await categoryRepo.exist({
        where:{
            name: payload.name
        }
    })

    if(foundCategoryByName){
        throw new AppError("Category already exists", 409);
    }

    const category = categoryRepo.create(payload);

    await categoryRepo.save(category);

    return category;
}
