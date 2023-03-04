import { validatePayloadMiddleware } from './../middlewares/validateUserPayload.middleware';
import { validateAdminMiddleware } from './../middlewares/validateAdmin.middleware';
import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { Router } from "express";
import { getAllRealEstatesController, postRealEstateController } from "../controllers/realEstates";
import { realEstateSchemaBody } from '../schemas/realEstates.schemas';

export const realEstatesRouter: Router = Router();

realEstatesRouter.post("/", validateTokenMiddleware, validateAdminMiddleware, validatePayloadMiddleware(realEstateSchemaBody),postRealEstateController);
realEstatesRouter.get("/", getAllRealEstatesController);
