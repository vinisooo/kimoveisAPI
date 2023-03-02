import { loginService } from './../services/login/login.service';
import { Request, Response } from "express"

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body;

    const loggedUserToken: string = await loginService(payload);

    return res.status(201).json({token: loggedUserToken})
}