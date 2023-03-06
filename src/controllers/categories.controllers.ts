import { getAllCategoriesService } from '../services/categories/getAllCategories.service';
import { getRealEstatesByCategoryService } from '../services/categories/getRealEstatesByCategory.service';
import { postCategoryService } from '../services/categories/postCategories.service';
import { Request, Response } from "express";

const postCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const addedCategory = await postCategoryService(payload);

    return res.status(201).json(addedCategory);
}

const getRealEstatesByCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const categoryId= Number(req.params.id);
    const realEstates = await getRealEstatesByCategoryService(categoryId);

    return res.status(200).json(realEstates);
}

const getAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories = await getAllCategoriesService();

    return res.status(200).json(categories)
}

export { postCategoryController, getRealEstatesByCategoryController, getAllCategoriesController  }
