import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { authService } from "./auth.service";

const credentialsLogin = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const result =await authService.credentialsLogin(req.body)
    res.status(200).json({
        success: true,
        message: "user login successfully",
        data: result
    })
})

export const authController = {
    credentialsLogin
}