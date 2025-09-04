import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

export const WalletRouter = Router()

WalletRouter.post("/add",checkAuth(...Object.values(Role)), WalletController.addMoney)
WalletRouter.post("/withdraw",checkAuth(...Object.values(Role)), WalletController.withdrawMoney)
WalletRouter.post("/send",checkAuth(...Object.values(Role)), WalletController.sendMoney)
WalletRouter.post('/cash-in', checkAuth(Role.AGENT), WalletController.cashIn)
WalletRouter.post('/cash-out', checkAuth(...Object.values(Role)), WalletController.cashOut)
WalletRouter.post('/update/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), WalletController.walletUpdate)
