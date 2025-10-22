import dotenv from 'dotenv'
dotenv.config()

interface IenvVars {
    PORT: string,
    DB_URL: string,
    NODE_ENV: string,
    BCRYPT_SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESS_SECRET: string,
    JWT_REFRESS_EXPIRES: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string,
    FRONTEND_URL: string
}

const loadEnvVariables = (): IenvVars =>{
    const requirdEnvVariable : string[] =["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESS_SECRET", "JWT_REFRESS_EXPIRES", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "FRONTEND_URL"]

    requirdEnvVariable.forEach(key =>{
        if(!process.env[key]){
            throw new Error(`missing env variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESS_SECRET: process.env.JWT_REFRESS_SECRET as string,
        JWT_REFRESS_EXPIRES: process.env.JWT_REFRESS_EXPIRES as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string
    }
}

export const envVars = loadEnvVariables()