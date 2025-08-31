import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { handlerDuplicateError } from "../helpers/handleDuplicateErr";
import { handlerZodError } from "../helpers/handleZodError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction ) => {
    interface TErrorSources {
        path: string;
        message: string
    }

    let message = "Something Went Wrong!!"
    let errorSours: TErrorSources[] = []

    if(err.code === 11000){
        const simplifiedError = handlerDuplicateError(err)
        message = simplifiedError.message
    }

    else if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err)
        message = simplifiedError.message
        errorSours = simplifiedError.errorSours as TErrorSources[]
    }

    res.status(500).json({
        success: false,
        message,
        errorSours,
        stack: envVars.NODE_ENV === "development" ? err.stack : null,
        err: envVars.NODE_ENV === "development" ? err : null,
    })
}