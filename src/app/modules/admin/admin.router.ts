import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

export const AdminRouter = Router()

AdminRouter.get('/users',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.getUsers)
AdminRouter.get('/agents',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.getAgents)
AdminRouter.get('/wallets',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.getWallets)
AdminRouter.get('/transactions',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.getTransactions)