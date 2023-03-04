import { validatePayloadMiddleware } from './../middlewares/validateUserPayload.middleware';
import { validateAdminMiddleware } from './../middlewares/validateAdmin.middleware';
import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { Router } from "express";
import { getAllRealEstatesController, postRealEstateController } from "../controllers/realEstates";
import { realEstateSchemaPostReq } from '../schemas/realEstates.schemas';

export const realEstatesRouter: Router = Router();

realEstatesRouter.post("/", validateTokenMiddleware, validateAdminMiddleware, validatePayloadMiddleware(realEstateSchemaPostReq),postRealEstateController);
realEstatesRouter.get("/", getAllRealEstatesController);
