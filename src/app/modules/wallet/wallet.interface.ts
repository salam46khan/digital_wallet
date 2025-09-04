import { Types } from "mongoose";

export enum WalletStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IWallet {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    balance: number;
    status: WalletStatus;
}

export interface IAddMoney{
    amount: number
}

export interface IWithdrawMoney{
    amount: number
}

export interface ISendMoney{
    toUserId: string;
    amount: number;
}
export interface ICashIn{
    toUserId: string;
    amount: number;
}
export interface ICashOut{
    toUserId: string;
    amount: number;
}
