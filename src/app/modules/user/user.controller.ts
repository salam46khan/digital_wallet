import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { UserService } from "./user.service"


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    res.status(200).json({
        message: "user create successfully",
        user
    })

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User Created Successfully",
    //     data: user,
    // })
})



export const UserController = {
    createUser
}