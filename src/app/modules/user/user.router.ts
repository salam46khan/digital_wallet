import { Router } from "express";
import { UserController } from "./user.controller";


export const UserRouter = Router()

UserRouter.post('/register', UserController.createUser)