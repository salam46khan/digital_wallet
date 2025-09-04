import { Router } from "express"
import { UserRouter } from "../modules/user/user.router"
import { AuthRouter } from "../modules/auth/auth.router"
import { WalletRouter } from "../modules/wallet/wallet.router"
import { AdminRouter } from "../modules/admin/admin.router"



export const routes = Router()
const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/wallet',
        route: WalletRouter
    },
    {
        path: '/admin',
        route: AdminRouter
    }
]

moduleRoutes.forEach((route)=>{
    routes.use(route.path, route.route)
})