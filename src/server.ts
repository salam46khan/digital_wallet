import {Server} from 'http'
import mongoose from 'mongoose'
import app from './app'
import { envVars } from './app/config/env'
import { seedSuperAdmin } from './app/utils/seedSupperAdmin'

let server: Server

const startServer = async () => {
    try {
        console.log(envVars.NODE_ENV);
        await mongoose.connect(envVars.DB_URL);
        console.log('connected');
        
        server = app.listen(envVars.PORT , ()=> {
            console.log(`Example app listening on port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log("err",error);
    }
}

// startServer()
(async () => {
    await startServer()
    await seedSuperAdmin()
})()

process.on("unhandledRejection", ()=>{
    console.log('unhandled rejection');

    if(server){
        server.close(()=> {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", ()=> {
    console.log('uncaught exception error')
    if(server){
        server.close(()=> {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved");
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

