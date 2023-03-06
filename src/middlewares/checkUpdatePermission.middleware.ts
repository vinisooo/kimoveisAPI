import { User } from './../entities/users.entities';
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { iLoggedUser } from "../interfaces/users.interfaces";

export const checkUpdatePermissionMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const userFoundById = req.foundUser;
    const loggedUser: iLoggedUser = req.loggedUser;

    if(!loggedUser.admin){
        if(userFoundById.id != loggedUser.id){
            throw new AppError("Insufficient permission", 403);
        }
    }
    return next();
}
