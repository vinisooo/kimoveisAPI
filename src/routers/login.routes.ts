import { loginController } from './../controllers/login.controllers';
import { Router } from "express";

export const loginRouter: Router = Router();

loginRouter.post("/", loginController);
