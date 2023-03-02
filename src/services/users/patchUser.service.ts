import { AppDataSource } from './../../data-source';
import { Repository } from 'typeorm';
import { User } from './../../entities/users.entities';
import { iNoPasswordUser } from '../../interfaces/users.interfaces';
import { noPasswordUserSchema } from '../../schemas/users.schemas';

export const patchUserService = async (foundUser: User, payload: object) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const editedUser: User = await userRepo.create({
        ...foundUser,
        ...payload
    })

    await userRepo.save(editedUser);

    const noPasswordEditedUser: iNoPasswordUser = noPasswordUserSchema.parse(editedUser);

    console.log(noPasswordEditedUser);
    return noPasswordEditedUser;
}
