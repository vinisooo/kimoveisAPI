import { postUserService } from './../services/users/postUser.service';
import { Request, Response } from "express"

export const postUser = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const createdUser = await postUserService(payload);

    return res.status(201).json(createdUser);
}