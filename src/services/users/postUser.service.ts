import { User } from './../../entities/users.entities';
import { AppDataSource } from './../../data-source';
import { Repository } from 'typeorm';
import { iNoPasswordUser, iPostUserReq } from "../../interfaces/users.interfaces";

export const postUserService = async(payload: User): Promise<iNoPasswordUser> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User = userRepo.create(payload);
    await userRepo.save(user);

    return user;
}