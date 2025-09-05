"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(transaction_interface_1.TransactionType),
        required: true,
    },
    wallet: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet", required: true },
    amount: {
        type: Number,
        required: true,
        min: [1, "Amount must be greater than 0"],
    },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, {
    versionKey: false,
    timestamps: true
});
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
