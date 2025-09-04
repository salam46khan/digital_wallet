import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { AdminService } from "./admin.service"

const getUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await AdminService.getUsers()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "get User Successfully",
        data: result,
    })
})
const getAgents = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await AdminService.getAgents()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "get agents Successfully",
        data: result,
    })
})
const getWallets = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await AdminService.getWallets()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "get wallets Successfully",
        data: result,
    })
})
const getTransactions = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await AdminService.getTransactions()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "get transactions Successfully",
        data: result,
    })
})

export const AdminController = {
    getUsers,
    getAgents,
    getWallets,
    getTransactions
}