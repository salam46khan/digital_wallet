import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { WalletService } from "./wallet.service"
import { JwtPayload } from "jsonwebtoken"

const addMoney = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const verifyToken = req.user;
    const payload = req.body;
    
    const result = await WalletService.addMoney( payload, verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "transaction add money Successfully",
        data: result,
    })
})

const withdrawMoney = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifyToken = req.user;
    const payload = req.body;
    
    const result = await WalletService.withdrawMoney( payload, verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "transaction withdraw Successfully",
        data: result,
    })
})

const sendMoney = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifyToken = req.user;
    const payload = req.body;

    const result = await WalletService.sendMoney( payload, verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "transaction send money Successfully",
        data: result,
    })
})

const cashIn = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifyToken = req.user;
    const payload = req.body;
    const result = await WalletService.cashIn(payload, verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "transaction cash-in Successfully",
        data: result,
    })
})
const cashOut = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifyToken = req.user;
    const payload = req.body;
    const result = await WalletService.cashOut(payload, verifyToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "transaction cash-out Successfully",
        data: result,
    })
})

const walletUpdate = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const userId = req.params.id;
    const verifyToken = req.user;
    const payload = req.body;

    const result = await WalletService.walletUpdate(userId , payload, verifyToken as JwtPayload)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "wallet update Successfully",
        data: result,
    })
})



export const WalletController = {
    addMoney,
    withdrawMoney,
    sendMoney,
    cashIn,
    cashOut,
    walletUpdate,
}