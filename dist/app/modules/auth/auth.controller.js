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
exports.authController = void 0;
const CatchAsync_1 = require("../../utils/CatchAsync");
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../../utils/setCookies");
const credentialsLogin = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.authService.credentialsLogin(req.body);
    (0, setCookies_1.setAuthCookie)(res, loginInfo);
    res.status(200).json({
        success: true,
        message: "user login successfully",
        data: loginInfo
    });
}));
const getNewAccessToken = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = yield auth_service_1.authService.getNewAccessToken(refreshToken);
    (0, setCookies_1.setAuthCookie)(res, tokenInfo);
    res.status(200).json({
        success: true,
        message: "get new access token Successfully",
        data: tokenInfo
    });
}));
const logoutUser = (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(200).json({
        success: true,
        message: "log out Successfully",
        data: null
    });
}));
exports.authController = {
    credentialsLogin,
    getNewAccessToken,
    logoutUser
};
