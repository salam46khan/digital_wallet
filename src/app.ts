import express, { Application, Request, Response } from 'express'
const app : Application = express()
import cors from 'cors'
import { routes } from './app/route'

app.use(express.json())
app.use(cors())
app.use("/api/v1", routes)

app.get('/', async (req: Request, res: Response) => {
    res.send(
        {message: "tour start"}
    )
})

export default app;