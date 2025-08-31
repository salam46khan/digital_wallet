import { Router } from "express"
import { UserRouter } from "../modules/user/user.router"
import { AuthRouter } from "../modules/auth/auth.router"



export const routes = Router()
const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    }
]

moduleRoutes.forEach((route)=>{
    routes.use(route.path, route.route)
})