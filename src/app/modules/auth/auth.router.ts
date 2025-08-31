import { Router } from "express";
import { authController } from "./auth.controller";

export const AuthRouter = Router()


AuthRouter.post('/login', authController.credentialsLogin)