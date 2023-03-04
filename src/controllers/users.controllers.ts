import { patchUserService } from '../services/users/patchUser.service';
import { getAllUsersService } from '../services/users/getAllUsers.service';
import { User } from './../entities/users.entities';
import { postUserService } from '../services/users/postUser.service';
import { Request, Response } from "express"
import { iNoPasswordUser, iPostUserReq } from '../interfaces/users.interfaces';
import { softDeleteUserService } from '../services/users/softDeleteUser.service';

const postUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload: iPostUserReq = req.body;
    const createdUser: iNoPasswordUser = await postUserService(payload);

    return res.status(201).json({...createdUser});
}

const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const allUsers: iNoPasswordUser[] = await getAllUsersService();

    return res.status(200).json(allUsers);
}

const patchUserController = async (req: Request, res: Response): Promise<Response> => {
    const foundUser: User = req.foundUser;
    const payload = req.body;
    const editedUser = await patchUserService(foundUser, payload);

    return res.status(200).json(editedUser);
}

const  softDeleteUserController = async(req: Request, res: Response): Promise<Response> => {
    const userId = parseInt(req.params.id);

    await softDeleteUserService(userId);

    return res.status(204).send();
}

export { postUserController, getAllUsersController, patchUserController, softDeleteUserController }
