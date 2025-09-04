import { JwtPayload } from "jsonwebtoken";
import { Transaction } from "../transaction/transaction.model";
import { IAddMoney, ICashIn, ISendMoney, IWallet, IWithdrawMoney, WalletStatus } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import { TransactionType } from "../transaction/transaction.interface";
import { Types } from "mongoose";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";

const addMoney = async (payload: Partial<IAddMoney>, decodedToken: JwtPayload) =>{

    //  payload, verifyToken as JwtPayload
    // userId: string, amount: number
    let amount = payload.amount as number;

    // console.log(payload, decodedToken);
    

    const wallet = await Wallet.findOne({ userId: decodedToken.userId });

    if (!wallet || wallet.status === WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }

    wallet.balance = wallet.balance + amount ;
    await wallet.save();

    const transaction = await Transaction.create({
        wallet: wallet._id,
        type: TransactionType.ADD_MONEY,
        amount,
        status: "success",
    });

    return transaction
}

const withdrawMoney = async(payload: Partial<IWithdrawMoney>, decodedToken: JwtPayload) =>{
    let amount = payload.amount as number;
    const wallet = await Wallet.findOne({ userId: decodedToken.userId });

    if (!wallet || wallet.status === WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }

    if (wallet.balance < amount) {
        throw new Error("you have not enough balance");
    }

    wallet.balance = wallet.balance - amount ;
    await wallet.save();

    const transaction = await Transaction.create({
        wallet: wallet._id,
        type: TransactionType.WITHDRAW,
        amount,
        status: "success",
    });

    return transaction

}

const sendMoney = async(payload: Partial<ISendMoney>, decodedToken: JwtPayload) =>{
    let amount = payload.amount as number;

    const Receiver = await Wallet.findOne({userId: payload.toUserId})
    const Sender = await Wallet.findOne({ userId: decodedToken.userId });
    // console.log(Receiver, Sender);

    if(Receiver?._id === Sender?._id) {
        throw new Error("You cannot send money to yourself");
    }
    if (Receiver?.status === WalletStatus.BLOCKED || Sender?.status === WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }

    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }

    Sender.balance = Sender.balance - amount
    Receiver.balance = Receiver.balance + amount

    await Sender.save();
    await Receiver.save();

    const sendTransaction = await Transaction.create({
        wallet: Sender._id,
        type: TransactionType.SEND_MONEY,
        amount,
        to: Receiver.userId,
    });

    const reciveTransaction = await Transaction.create({
        wallet: Receiver._id,
        type: TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    })
    
    return {sendTransaction, reciveTransaction}
}

const cashIn = async(payload: Partial<ICashIn>, decodedToken: JwtPayload)=>{
    let amount = payload.amount as number;

    const Receiver = await Wallet.findOne({userId: payload.toUserId})
    const Sender = await Wallet.findOne({ userId: decodedToken.userId });

    // console.log(Receiver, Sender);

    if(Receiver?._id === Sender?._id) {
        throw new Error("You cannot send money to yourself");
    }
    if (Receiver?.status === WalletStatus.BLOCKED || Sender?.status === WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }

    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }

    Sender.balance = Sender.balance - amount
    Receiver.balance = Receiver.balance + amount

    await Sender.save();
    await Receiver.save();

    const sendTransaction = await Transaction.create({
        wallet: Sender._id,
        type: TransactionType.SEND_MONEY,
        amount,
        to: Receiver.userId,
    });

    const reciveTransaction = await Transaction.create({
        wallet: Receiver._id,
        type: TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    })
    
    return {sendTransaction, reciveTransaction}
}

const cashOut = async(payload: Partial<ICashIn>, decodedToken: JwtPayload) =>{
    let amount = payload.amount as number;
    const agent = await User.findById(payload.toUserId)

    if(agent?.role !== Role.AGENT){
        throw new Error("you mast cash out to agent")
    }

    const Receiver = await Wallet.findOne({userId: payload.toUserId})
    const Sender = await Wallet.findOne({ userId: decodedToken.userId });

    // console.log(Receiver, Sender, agent);
    if(Receiver?._id === Sender?._id) {
        throw new Error("You cannot send money to yourself");
    }
    if (Receiver?.status === WalletStatus.BLOCKED || Sender?.status === WalletStatus.BLOCKED) {
        throw new Error("Wallet is blocked or not found");
    }
    if (!Receiver || !Sender) {
        throw new Error("Sender or Receiver wallet not found");
    }

    if (Sender.balance < amount) {
        throw new Error("You have not enough balance");
    }

    Sender.balance = Sender.balance - amount
    Receiver.balance = Receiver.balance + amount

    await Sender.save();
    await Receiver.save();

    const sendTransaction = await Transaction.create({
        wallet: Sender._id,
        type: TransactionType.CASH_OUT,
        amount,
        to: Receiver.userId,
    });

    const reciveTransaction = await Transaction.create({
        wallet: Receiver._id,
        type: TransactionType.CASH_IN,
        amount,
        from: Sender.userId
    })

    return {sendTransaction, reciveTransaction}
}

const walletUpdate = async(UserId:string, payload : Partial<IWallet>, decodedToken: JwtPayload) =>{
    
    const isUserExist = await User.findById(UserId)
    if(!isUserExist){
        throw new Error('user not exsit')
    }

    const wallet = await Wallet.findOne({userId: UserId})
    console.log(wallet);
    
    const newUpdateWallet = await Wallet.findByIdAndUpdate(wallet?._id, payload, {new: true, runValidators: true})
    
    return newUpdateWallet
}

export const WalletService = {
    addMoney,
    withdrawMoney,
    sendMoney,
    cashIn,
    cashOut,
    walletUpdate
}