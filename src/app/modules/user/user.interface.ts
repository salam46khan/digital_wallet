import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT",
}

export interface IAuthProvider {
    provider:  "Google" | "Credential"
    providerId: string;
}

export enum AgentStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    SUSPENDED = "SUSPENDED"
}

export interface IAgent {
    approvalStatus: AgentStatus;
    commissionRate?: number; 
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    role: Role;
    auths: IAuthProvider[];
    wallet?: Types.ObjectId;
    agent?: IAgent
}