import { checkUpdatePermissionMiddleware } from './../middlewares/checkUpdatePermission.middleware';
import { findUserByIdMiddleware } from './../middlewares/findUserById.middleware';
import { validateAdminMiddleware } from './../middlewares/validateAdmin.middleware';
import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { validateUserPayload } from './../middlewares/validateUserPayload.middleware';
import { getAllUsersController, patchUserController, postUserController } from './../controllers/users.controllers';
import { Router } from "express";
import { editUserSchema, postUserReqSchema } from '../schemas/users.schemas';
import { checkIfEmailExistsMiddleware } from '../middlewares/checkIfEmailExists.middleware';

export const userRouter: Router =  Router();

userRouter.post("/", validateUserPayload(postUserReqSchema), checkIfEmailExistsMiddleware, postUserController);
userRouter.get("/", validateTokenMiddleware, validateAdminMiddleware, getAllUsersController);
userRouter.patch("/:id", validateTokenMiddleware, findUserByIdMiddleware, validateUserPayload(editUserSchema), checkUpdatePermissionMiddleware, checkIfEmailExistsMiddleware, patchUserController);
