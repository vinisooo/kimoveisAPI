import { postCategoryService } from './../services/categories/postCategories.service';
import { Request, Response } from "express";

const postCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const addedCategory = await postCategoryService(payload);

    return res.status(201).json(addedCategory);
}

export { postCategoryController }
