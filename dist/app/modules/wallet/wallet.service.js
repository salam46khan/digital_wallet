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
exports.WalletService = void 0;
const transaction_model_1 = require("../transaction/transaction.model");
const wallet_interface_1 = require("./wallet.interface");
const wallet_model_1 = require("./wallet.model");
const transaction_interface_1 = require("../transaction/transaction.interface");
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
const addMoney = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    //  payload, verifyToken as JwtPayload
    // userId: string, amount: number
    let amount = payload.amount;
    // console.log(payload, decodedToken);
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    if (!wallet || wallet.status === wallet_interface_1.WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    wallet.balance = wallet.balance + amount;
    yield wallet.save();
    const transaction = yield transaction_model_1.Transaction.create({
        wallet: wallet._id,
        type: transaction_interface_1.TransactionType.ADD_MONEY,
        amount,
        status: "success",
    });
    return transaction;
});
const withdrawMoney = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = payload.amount;
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    if (!wallet || wallet.status === wallet_interface_1.WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (wallet.balance < amount) {
        throw new Error("you have not enough balance");
    }
    wallet.balance = wallet.balance - amount;
    yield wallet.save();
    const transaction = yield transaction_model_1.Transaction.create({
        wallet: wallet._id,
        type: transaction_interface_1.TransactionType.WITHDRAW,
        amount,
        status: "success",
    });
    return transaction;
});
const sendMoney = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = payload.amount;
    const Receiver = yield wallet_model_1.Wallet.findOne({ userId: payload.toUserId });
    const Sender = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    // console.log(Receiver, Sender);
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver.userId.toString()) === (Sender === null || Sender === void 0 ? void 0 : Sender.userId.toString())) {
        throw new Error("You cannot send money to yourself");
    }
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver.status) === wallet_interface_1.WalletStatus.BLOCKED || (Sender === null || Sender === void 0 ? void 0 : Sender.status) === wallet_interface_1.WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }
    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }
    Sender.balance = Sender.balance - amount;
    Receiver.balance = Receiver.balance + amount;
    yield Sender.save();
    yield Receiver.save();
    const sendTransaction = yield transaction_model_1.Transaction.create({
        wallet: Sender._id,
        type: transaction_interface_1.TransactionType.SEND_MONEY,
        amount,
        to: Receiver.userId,
    });
    const reciveTransaction = yield transaction_model_1.Transaction.create({
        wallet: Receiver._id,
        type: transaction_interface_1.TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    });
    return { sendTransaction, reciveTransaction };
});
const cashIn = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = payload.amount;
    const Receiver = yield wallet_model_1.Wallet.findOne({ userId: payload.toUserId });
    const Sender = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    // console.log(Receiver, Sender);
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver._id.toString()) === (Sender === null || Sender === void 0 ? void 0 : Sender._id.toString())) {
        throw new Error("You cannot send money to yourself");
    }
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver.status) === wallet_interface_1.WalletStatus.BLOCKED || (Sender === null || Sender === void 0 ? void 0 : Sender.status) === wallet_interface_1.WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }
    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }
    Sender.balance = Sender.balance - amount;
    Receiver.balance = Receiver.balance + amount;
    yield Sender.save();
    yield Receiver.save();
    const sendTransaction = yield transaction_model_1.Transaction.create({
        wallet: Sender._id,
        type: transaction_interface_1.TransactionType.SEND_MONEY,
        amount,
        to: Receiver.userId,
    });
    const reciveTransaction = yield transaction_model_1.Transaction.create({
        wallet: Receiver._id,
        type: transaction_interface_1.TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    });
    return { sendTransaction, reciveTransaction };
});
const cashOut = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = payload.amount;
    const agent = yield user_model_1.User.findById(payload.toUserId);
    if ((agent === null || agent === void 0 ? void 0 : agent.role) !== user_interface_1.Role.AGENT) {
        throw new Error("you mast cash out to agent");
    }
    const Receiver = yield wallet_model_1.Wallet.findOne({ userId: payload.toUserId });
    const Sender = yield wallet_model_1.Wallet.findOne({ userId: decodedToken.userId });
    // console.log(Receiver, Sender, agent);
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver._id.toString()) === (Sender === null || Sender === void 0 ? void 0 : Sender._id.toString())) {
        throw new Error("You cannot send money to yourself");
    }
    if ((Receiver === null || Receiver === void 0 ? void 0 : Receiver.status) === wallet_interface_1.WalletStatus.BLOCKED || (Sender === null || Sender === void 0 ? void 0 : Sender.status) === wallet_interface_1.WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }
    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }
    Sender.balance = Sender.balance - amount;
    Receiver.balance = Receiver.balance + amount;
    yield Sender.save();
    yield Receiver.save();
    const sendTransaction = yield transaction_model_1.Transaction.create({
        wallet: Sender._id,
        type: transaction_interface_1.TransactionType.CASH_OUT,
        amount,
        to: Receiver.userId,
    });
    const reciveTransaction = yield transaction_model_1.Transaction.create({
        wallet: Receiver._id,
        type: transaction_interface_1.TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    });
    return { sendTransaction, reciveTransaction };
});
const walletUpdate = (UserId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(UserId);
    if (!isUserExist) {
        throw new Error('user not exsit');
    }
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: UserId });
    // console.log(wallet);
    const newUpdateWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(wallet === null || wallet === void 0 ? void 0 : wallet._id, payload, { new: true, runValidators: true });
    return newUpdateWallet;
});
exports.WalletService = {
    addMoney,
    withdrawMoney,
    sendMoney,
    cashIn,
    cashOut,
    walletUpdate
};
