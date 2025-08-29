import dotenv from 'dotenv'
dotenv.config()

interface IenvVars {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production"
}

const loadEnvVariables = (): IenvVars =>{
    const requirdEnvVariable : string[] =["PORT", "DB_URL", "NODE_ENV"]

    requirdEnvVariable.forEach(key =>{
        if(!process.env[key]){
            throw new Error(`missing env variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
    }
}

export const envVars = loadEnvVariables()