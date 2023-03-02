import { postUserService } from './../services/users/postUser.service';
import { Request, Response } from "express"
import { iNoPasswordUser, iPostUserReq } from '../interfaces/users.interfaces';

export const postUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload: iPostUserReq = req.body;
    const createdUser: iNoPasswordUser = await postUserService(payload);

    return res.status(201).json({...createdUser});
}
