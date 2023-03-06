import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { validatePayloadMiddleware } from './../middlewares/validateUserPayload.middleware';
import { Router } from "express";
import { categoryReqSchema } from '../schemas/categories.schemas';
import { getAllCategoriesController, getRealEstatesByCategoryController, postCategoryController } from '../controllers/categories.controllers';
import { validateAdminMiddleware } from '../middlewares/validateAdmin.middleware';

export const categoriesRouter: Router = Router();

categoriesRouter.post("/", validatePayloadMiddleware(categoryReqSchema), validateTokenMiddleware, validateAdminMiddleware, postCategoryController);
categoriesRouter.get("/:id/realEstate", getRealEstatesByCategoryController)
categoriesRouter.get("/", getAllCategoriesController);
