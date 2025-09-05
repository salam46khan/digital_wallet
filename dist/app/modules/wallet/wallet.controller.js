"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const CatchAsync_1 = require("../../utils/CatchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const wallet_service_1 = require("./wallet.service");
const addMoney = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.addMoney(payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "transaction add money Successfully",
        data: result,
    });
}));
const withdrawMoney = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.withdrawMoney(payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "transaction withdraw Successfully",
        data: result,
    });
}));
const sendMoney = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.sendMoney(payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "transaction send money Successfully",
        data: result,
    });
}));
const cashIn = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.cashIn(payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "transaction cash-in Successfully",
        data: result,
    });
}));
const cashOut = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.cashOut(payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "transaction cash-out Successfully",
        data: result,
    });
}));
const walletUpdate = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const verifyToken = req.user;
    const payload = req.body;
    const result = yield wallet_service_1.WalletService.walletUpdate(userId, payload, verifyToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "wallet update Successfully",
        data: result,
    });
}));
exports.WalletController = {
    addMoney,
    withdrawMoney,
    sendMoney,
    cashIn,
    cashOut,
    walletUpdate,
};
