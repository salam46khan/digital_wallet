import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser =async (payload: Partial<IUser>) => {
    const { email, password, ...rest} = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new Error("already exsict")
    }

    const user = await User.create({
        email,
        ...rest
    })

    return user
}

export const UserService = {
    createUser
}