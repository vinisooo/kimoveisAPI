import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { validatePayloadMiddleware } from './../middlewares/validateUserPayload.middleware';
import { Router } from "express";
import { categoryReqSchema } from '../schemas/categories.schemas';
import { postCategoryController } from '../controllers/categories';
import { validateAdminMiddleware } from '../middlewares/validateAdmin.middleware';

export const categoriesRouter: Router = Router();

categoriesRouter.post("/", validatePayloadMiddleware(categoryReqSchema), validateTokenMiddleware, validateAdminMiddleware, postCategoryController);
