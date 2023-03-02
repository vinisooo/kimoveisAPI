import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const validateAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.loggedUser.admin){
        throw new AppError("Insufficient permission", 403);
    }
    return next();
}
