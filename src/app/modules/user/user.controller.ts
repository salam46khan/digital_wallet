import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { UserService } from "./user.service"


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    res.status(200).json({
        success: true,
        message: "user create successfully",
        data: user
    })
})

const getAllUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await UserService.getAllUser()

    res.status(200).json({
        success: true,
        message: "get user successfully",
        data: result
    })
})



export const UserController = {
    createUser,
    getAllUser
}