import { Category } from './../../entities/categories.entities';
import { AppDataSource } from './../../data-source';
import { Repository } from 'typeorm';
import { AppError } from '../../errors';

export const getRealEstatesByCategoryService = async(id: number) => {
    const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const foundRealEstates = await categoriesRepo
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :id", { id })
    .getOne();

    if(!foundRealEstates){
        throw new AppError("Category not found", 404);
    }

    return foundRealEstates
}
