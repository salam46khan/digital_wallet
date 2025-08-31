import bcript from 'bcryptjs'
import { User } from '../modules/user/user.model';
import { envVars } from '../config/env';
import { IAuthProvider, IUser, Role } from '../modules/user/user.interface';

export const seedSuperAdmin = async() => {
    try {
        const isSupperAdmin = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
        if(isSupperAdmin){
            console.log('supper admin already exsit');
            return
        }

        const hashPassword = await bcript.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider  = {
            provider: "Credential",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            role: Role.SUPER_ADMIN,
            password: hashPassword,
            auths: [authProvider]
        }
        await User.create(payload)
    } catch (error) {
        console.log(error);
    }
}