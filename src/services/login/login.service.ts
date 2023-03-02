import { User } from './../../entities/users.entities';
import { AppDataSource } from './../../data-source';
import { Repository } from 'typeorm';
import { iLoginReqSchema } from "../../interfaces/users.interfaces";
import { AppError } from '../../errors';
import { compare } from 'bcryptjs';
import jwt from "jsonwebtoken";

export const loginService = async(payload: iLoginReqSchema): Promise<string> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const foundUserById: User | null = await userRepo.findOneBy({
        email: payload.email
    });

    if(!foundUserById){
        throw new AppError("Invalid email or password", 401);
    }
    console.log(foundUserById);

    const rightPassword: boolean = await compare(payload.password, foundUserById.password);

    if(!rightPassword){
        throw new AppError("Invalid email or password", 401);
    }

    const token: string = jwt.sign({
        admin: foundUserById.admin
    },
        process.env.SECRET_KEY!
    ,
    {
        expiresIn: process.env.EXPIRES_IN,
        subject: foundUserById.id.toString()
    }
    )
    return token
}