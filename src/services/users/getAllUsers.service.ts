import { AppDataSource } from './../../data-source';
import { User } from './../../entities/users.entities';
import { Repository } from 'typeorm';


export const getAllUsersService = async () => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const allUsers: User[] = await userRepo.find();

    return allUsers
}