import { createUserToken, getNewAccessTokenWithRefreshToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import bcrypt from 'bcryptjs'

const credentialsLogin = async(payload: IUser) =>{
    const {email, password} = payload;
    const isUserExist = await User.findOne({email})
    if(!isUserExist){
        throw new Error("user does not exsit")
    }
    const passwordMatch = await bcrypt.compare(password as string, isUserExist.password as string)
    
    if(!passwordMatch){
        throw new Error('Password does not match!')
    }
    // console.log("done");
    const {password: pass, ...rest} = isUserExist.toObject()

    const userToken = createUserToken(isUserExist)

    return {
        accessToken : userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await getNewAccessTokenWithRefreshToken(refreshToken)
    return { 
        accessToken : newAccessToken
    }
}

export const authService = {
    credentialsLogin,
    getNewAccessToken
}