import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import { AppError } from '../errors';

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers.authorization;
    if(!token){
        throw new AppError("Missing bearer token", 401);
    }

    token = token?.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded: any) => {
        if(err){
            throw new AppError(err.message, 401)
        }
        req.loggedUser = {
            admin: decoded.admin,
            id: decoded.id
        }
    })
    return next();
}
