import { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/env"
import { IUser } from "../modules/user/user.interface"
import { generateToken, verifiedToken } from "./jwt"
import { User } from "../modules/user/user.model"


export const createUserToken = (user: IUser)=>{
    const jwtPayload = {
        userId : user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESS_SECRET, envVars.JWT_REFRESS_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}

export const getNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifiedToken(refreshToken, envVars.JWT_REFRESS_SECRET) as JwtPayload

    const isUserExist = await User.findOne({email: verifiedRefreshToken.email})

    if(!isUserExist){
        throw new Error("user dose not exsit")
    }
    
    const jwtPayload = {
        userId : isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return accessToken
}