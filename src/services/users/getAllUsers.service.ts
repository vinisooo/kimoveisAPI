import { AppDataSource } from './../../data-source';
import { User } from './../../entities/users.entities';
import { Repository } from 'typeorm';
import { noPasswordUserSchema } from '../../schemas/users.schemas';
import { iNoPasswordUser } from '../../interfaces/users.interfaces';

export const getAllUsersService = async (): Promise<iNoPasswordUser[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const allUsers: User[] = await userRepo.find();

    const noPasswordUsers: iNoPasswordUser[] = allUsers.map((user) => noPasswordUserSchema.parse(user))

    return noPasswordUsers
}
