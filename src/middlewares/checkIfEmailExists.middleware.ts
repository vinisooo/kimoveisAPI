import { User } from './../entities/users.entities';
import { AppDataSource } from './../data-source';
import { Repository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';


export const checkIfEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const payload: User = req.body;

    if(!payload.email){
        return next();
    }

    const foundByEmail = await userRepo.exist({
        where:{
            email: payload.email
        }
    })

    if(foundByEmail){
        throw new AppError("Email already exists", 409)
    }

    return next();
}