import { getAllUsersService } from './../services/users/getAllUsers.service';
import { User } from './../entities/users.entities';
import { postUserService } from './../services/users/postUser.service';
import { Request, Response } from "express"
import { iNoPasswordUser, iPostUserReq } from '../interfaces/users.interfaces';

const postUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload: iPostUserReq = req.body;
    const createdUser: iNoPasswordUser = await postUserService(payload);

    return res.status(201).json({...createdUser});
}

const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const allUsers: User[] = await getAllUsersService();

    return res.status(200).json(allUsers);
}

export { postUserController, getAllUsersController }
