import { checkUpdatePermissionMiddleware } from './../middlewares/checkUpdatePermission.middleware';
import { findUserByIdMiddleware } from './../middlewares/findUserById.middleware';
import { validateAdminMiddleware } from './../middlewares/validateAdmin.middleware';
import { validateTokenMiddleware } from './../middlewares/validateToken.middleware';
import { validatePayloadMiddleware } from './../middlewares/validateUserPayload.middleware';
import { getAllUsersController, patchUserController, postUserController, softDeleteUserController } from './../controllers/users.controllers';
import { Router } from "express";
import { editUserSchema, postUserReqSchema } from '../schemas/users.schemas';
import { checkIfEmailExistsMiddleware } from '../middlewares/checkIfEmailExists.middleware';

export const userRouter: Router =  Router();

userRouter.post("/", validatePayloadMiddleware(postUserReqSchema), checkIfEmailExistsMiddleware, postUserController);
userRouter.get("/", validateTokenMiddleware, validateAdminMiddleware, getAllUsersController);
userRouter.patch("/:id", validateTokenMiddleware, findUserByIdMiddleware, validatePayloadMiddleware(editUserSchema), checkUpdatePermissionMiddleware, checkIfEmailExistsMiddleware, patchUserController);
userRouter.delete("/:id", findUserByIdMiddleware, validateTokenMiddleware, validateAdminMiddleware, softDeleteUserController);
