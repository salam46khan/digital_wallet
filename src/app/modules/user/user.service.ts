import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs'

const createUser =async (payload: Partial<IUser>) => {
    const { email, password, ...rest} = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new Error("user already exsict")
    }

    // const hashPassword =await bcryptjs.hash(password as string, Number(envVars.BCRIPT_SALT_ROUND))
    const hashPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
console.log(hashPassword);

    const authProvider: IAuthProvider = {provider:"Credential", providerId: email as string}

    const user = await User.create({
        email,
        auths: authProvider,
        password: hashPassword,
        ...rest
    })

    return user
}

const getAllUser = async() =>{
    const users = await User.find()

    return users
}

const updateUser = async (userId: string, payload : Partial<IUser> , decodedToken: JwtPayload) => {

}

export const UserService = {
    createUser,
    getAllUser
}