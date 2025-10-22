import express, { Application, Request, Response } from 'express'
const app : Application = express()
import cors from 'cors'
import { routes } from './app/route'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import { envVars } from './app/config/env'

app.use(express.json())
app.use(cookieParser())
app.set("trust proxy", 1)
app.use(cors({
    // origin: "http://localhost:5173",
    origin: envVars.FRONTEND_URL,
    credentials: true
}))
app.use("/api/v1", routes)

app.get('/', async (req: Request, res: Response) => {
    res.send(
        {message: "tour start"}
    )
})

app.use(globalErrorHandler)
app.use(notFound)
export default app;