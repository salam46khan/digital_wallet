import { Router } from "express"
import { UserRouter } from "../modules/user/user.router"



export const routes = Router()
const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter
    },
    // {
    //     path: '/auth',
    //     route: AuthRouter
    // },
    // {
    //     path: '/division',
    //     route: DivisionRouter
    // },
    // {
    //     path: '/tour',
    //     route: TourRouter
    // }
]

moduleRoutes.forEach((route)=>{
    routes.use(route.path, route.route)
})