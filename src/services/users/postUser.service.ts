import { User } from '../../entities/users.entities';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { iNoPasswordUser, iPostUserReq } from "../../interfaces/users.interfaces";
import { noPasswordUserSchema } from '../../schemas/users.schemas';

export const postUserService = async(payload: iPostUserReq): Promise<iNoPasswordUser> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User = userRepo.create(payload as User);
    await userRepo.save(user);

    const noPasswordUser: iNoPasswordUser = noPasswordUserSchema.parse(user);

    return noPasswordUser;
}
