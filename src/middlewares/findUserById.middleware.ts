import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './../data-source';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { AppError } from '../errors';

export const findUserByIdMiddleware = async(req: Request, res: Response, next: NextFunction) =>{
    const userId = req.params.id;
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const foundUser: User | null = await userRepo.findOneBy({id: parseInt(userId)})

    if(!foundUser || !parseInt(userId)){
        throw new AppError("User not found", 404);
    }

    req.foundUser = foundUser;
    return next();
}
