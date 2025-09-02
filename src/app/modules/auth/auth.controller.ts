import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { authService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookies";

const credentialsLogin = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const loginInfo =await authService.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo)

    res.status(200).json({
        success: true,
        message: "user login successfully",
        data: loginInfo
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const tokenInfo = await authService.getNewAccessToken(refreshToken)
    
    setAuthCookie(res, tokenInfo)

    res.status(200).json({
        success: true,
        message: "get new access token Successfully",
        data: tokenInfo
    })
})

const logoutUser =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({
        success: true,
        message: "log out Successfully",
        data: null
    })
})

export const authController = {
    credentialsLogin,
    getNewAccessToken,
    logoutUser
}