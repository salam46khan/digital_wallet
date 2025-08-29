import { model, Schema } from "mongoose";
import { AgentStatus, IAgent, IAuthProvider, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})

const agentSchema = new Schema<IAgent>({
    approvalStatus: {
        type: String,
        enum: Object.values(AgentStatus),
        default: AgentStatus.PENDING,
    },
    commissionRate: { type: Number, default: 0 }
}, {
    versionKey: false,
    _id: false
});

const userSchema = new Schema<IUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    address: {type: String},
    phone: {type: String},
    picture: {type: String},
    auths: [authProviderSchema],
    agent: agentSchema,
}, {
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>('User', userSchema)