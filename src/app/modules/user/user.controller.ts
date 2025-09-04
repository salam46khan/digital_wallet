import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { UserService } from "./user.service"
import { JwtPayload } from "jsonwebtoken"
import { sendResponse } from "../../utils/sendResponse"


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Created Successfully",
        data: user,
    })
})
const getMyTransactions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const verifyToken = req.user;
    const myTransactions = await UserService.getMyTransactions(verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "get my gransactions Successfully",
        data: myTransactions,
    })
})


const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const userId = req.params.id;
    const verifyToken = req.user;
    const payload = req.body;

    // console.log(verifyToken);
    

    const update =await UserService.updateUser(userId, payload, verifyToken as JwtPayload)


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User update Successfully",
        data: update
    })
})



export const UserController = {
    createUser,
    updateUser,
    getMyTransactions
}