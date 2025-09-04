import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs'
import { Wallet } from "../wallet/wallet.model";
import { Transaction } from "../transaction/transaction.model";

const createUser =async (payload: Partial<IUser>) => {
    const { email, password, ...rest} = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new Error("user already exsict")
    }

    const hashPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = {provider:"Credential", providerId: email as string}

    const user = await User.create({
        email,
        auths: authProvider,
        password: hashPassword,
        ...rest
    })

    await Wallet.create({
        userId: user._id
    });

    return user
}


const updateUser = async (userId: string, payload : Partial<IUser> , decodedToken: JwtPayload) => {
    const isUserExist = await User.findById(userId)
    if(!isUserExist){
        throw new Error('user not exsit')
    }

    if(userId !== decodedToken.userId && decodedToken.role !== Role.ADMIN && decodedToken.role !== Role.SUPER_ADMIN){
        throw new Error('you are not right authorize vaiya')
    }

    if(payload.role){
        if(decodedToken.role === Role.USER || decodedToken.role === Role.AGENT){
            throw new Error('you are not right authorize to change role')
        }
        if(payload.role === Role.SUPER_ADMIN || decodedToken.role === Role.ADMIN){
            throw new Error('you are not right authorize to change role')
        }
    }


    if(payload.password){
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND))
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

    return newUpdateUser
}

const getMyTransactions = async(decodedToken: JwtPayload)=>{
    // console.log(decodedToken);
    const mywallet = await Wallet.findOne({userId: decodedToken.userId})
    // console.log(mywallet);
    const myTransactions = await Transaction.find({wallet: mywallet?._id})
    
    return myTransactions
}

export const UserService = {
    createUser,
    updateUser,
    getMyTransactions
}