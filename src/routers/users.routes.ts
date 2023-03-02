import { validateUserPayload } from './../middlewares/validateUserPayload.middleware';
import { postUserController } from './../controllers/users.controllers';
import { Router } from "express";
import { postUserReqSchema } from '../schemas/users.schemas';
import { checkIfEmailExists } from '../middlewares/checkIfEmailExists.middleware';

export const userRouter: Router =  Router();

userRouter.post("/", validateUserPayload(postUserReqSchema), checkIfEmailExists, postUserController);
