import { Category } from './../../entities/categories.entities';
import { AppDataSource } from './../../data-source';
import { Repository } from 'typeorm';
import { AppError } from '../../errors';

export const getAllCategoriesService = async() => {
    const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const categories = await categoriesRepo.find();

    return categories
}
