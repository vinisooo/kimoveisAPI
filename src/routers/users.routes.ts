import { postUserController } from './../controllers/users.controllers';
import { Router } from "express";

export const userRouter: Router =  Router();

userRouter.post("/", postUserController);
