import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from "zod";


export const validateUserPayload = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedUser = schema.parse(req.body);

    req.body = validatedUser;
    return next();
}
