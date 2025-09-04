import { model, Schema } from "mongoose";
import { ITransaction, TransactionType } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction> ({
    type: {
        type: String,
        enum: Object.values(TransactionType),
        required: true,
    },
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    amount: {
        type: Number,
        required: true,
        min: [1, "Amount must be greater than 0"],
    },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    
},{
    versionKey: false,
    timestamps: true
})

export const Transaction = model<ITransaction>("Transaction", transactionSchema)