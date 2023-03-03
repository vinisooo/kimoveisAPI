import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from "zod";


export const validatePayloadMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedPayload = schema.parse(req.body);

    req.body = validatedPayload;
    return next();
}
