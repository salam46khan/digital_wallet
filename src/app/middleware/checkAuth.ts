import { NextFunction, Request, Response } from "express";
import { verifiedToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const checkAuth = (...authRoles: string[])=> async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken = req.headers.authorization;
        if(!accessToken){
            throw new Error("access token not found")
        }

        const verifyToken = verifiedToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        if(!authRoles.includes(verifyToken.role)){
            throw new Error("You are not permitted to view this route!!!")
        }

        const isUserExist = await User.findOne({email: verifyToken.email})

        if(!isUserExist){
            throw new Error("user dose not exsit")
        }

        req.user = verifyToken;

        next()
    } catch (error) {
        next(error)
    }
}