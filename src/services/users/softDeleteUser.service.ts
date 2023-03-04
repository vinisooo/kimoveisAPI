import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { User } from '../../entities/users.entities';

export const softDeleteUserService = async(userId: number, foundUser?: User) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOne({
        where: {
            id: userId
        }
    })

    await userRepo.softRemove(user!);
}
