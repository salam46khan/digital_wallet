"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
});
const agentSchema = new mongoose_1.Schema({
    approvalStatus: {
        type: String,
        enum: Object.values(user_interface_1.AgentStatus),
        default: user_interface_1.AgentStatus.PENDING,
    },
    commissionRate: { type: Number, default: 0 }
}, {
    versionKey: false,
    _id: false
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER
    },
    address: { type: String },
    phone: { type: String },
    picture: { type: String },
    auths: [authProviderSchema],
    agent: agentSchema,
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)('User', userSchema);
