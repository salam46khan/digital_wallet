import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";


export const UserRouter = Router()

UserRouter.post('/register', validateRequest(createUserZodSchema), UserController.createUser)
UserRouter.get('/',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUser)
UserRouter.patch('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)