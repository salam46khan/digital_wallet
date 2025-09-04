import { Types } from "mongoose";


export enum TransactionType {
  ADD_MONEY = "ADD_MONEY",   // user নিজে টাকা যোগ করবে (top-up)
  WITHDRAW = "WITHDRAW",     // user নিজে টাকা তুলবে
  SEND_MONEY = "SEND_MONEY", // এক user থেকে অন্য user এ পাঠানো
  CASH_IN = "CASH_IN",       // agent → user
  CASH_OUT = "CASH_OUT",     // agent ← user
}

export interface ITransaction {
    _id?: Types.ObjectId;
    type: TransactionType;
    wallet: Types.ObjectId;
    amount: number;
    fee?: number; // system fee (optional)
    commission?: number; // agent commission (optional)
    from?: Types.ObjectId; // কে পাঠিয়েছে (user/agent)
    to?: Types.ObjectId;   // কে পেয়েছে (user/agent)
}