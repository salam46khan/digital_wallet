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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const env_1 = require("../../config/env");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const wallet_model_1 = require("../wallet/wallet.model");
const transaction_model_1 = require("../transaction/transaction.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new Error("user already exsict");
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = { provider: "Credential", providerId: email };
    const user = yield user_model_1.User.create(Object.assign({ email, auths: authProvider, password: hashPassword }, rest));
    yield wallet_model_1.Wallet.create({
        userId: user._id
    });
    return user;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new Error('user not exsit');
    }
    if (userId !== decodedToken.userId && decodedToken.role !== user_interface_1.Role.ADMIN && decodedToken.role !== user_interface_1.Role.SUPER_ADMIN) {
        throw new Error('you are not right authorize vaiya');
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.AGENT) {
            throw new Error('you are not right authorize to change role');
        }
        if (payload.role === user_interface_1.Role.SUPER_ADMIN || decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new Error('you are not right authorize to change role');
        }
    }
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    }
    const newUpdateUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdateUser;
});
const getMyTransactions = (decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(decodedToken);
    const mywallet = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    // console.log(mywallet);
    const myTransactions = yield transaction_model_1.Transaction.find({ wallet: mywallet === null || mywallet === void 0 ? void 0 : mywallet._id });
    return myTransactions;
});
exports.UserService = {
    createUser,
    updateUser,
    getMyTransactions
};
