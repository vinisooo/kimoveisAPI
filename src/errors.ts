import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode = 400){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

const handleError = (err: Error, req: Request, res: Response, _:NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if(err instanceof ZodError){
        return res.status(400).json({
            message: err.flatten().fieldErrors
        })
    }

    return res.status(500).json({
        message: "Internal server error"
    })

}

export { AppError, handleError }
