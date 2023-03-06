import { validateAdminMiddleware } from './../middlewares/validateAdmin.middleware';
import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { Router } from "express";
import { getSchedulesByRealEstateController, postScheduleController } from "../controllers/schedules.controllers";
import { validatePayloadMiddleware } from "../middlewares/validateUserPayload.middleware";
import { scheduleReqSchema } from "../schemas/schedules.schemas";

export const schedulesRouter: Router = Router();

schedulesRouter.post("/", validateTokenMiddleware, validatePayloadMiddleware(scheduleReqSchema) ,postScheduleController);
schedulesRouter.get("/realEstate/:id", validateTokenMiddleware, validateAdminMiddleware, getSchedulesByRealEstateController)
