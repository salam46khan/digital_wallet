"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
const agentZodSchema = zod_1.default.object({
    approvalStatus: zod_1.default.enum(Object.values(user_interface_1.AgentStatus), {
        message: "Invalid agent status",
    }),
    commissionRate: zod_1.default
        .number()
        .min(0, { message: "Commission rate cannot be negative" })
        .max(100, { message: "Commission rate cannot exceed 100%" })
        .optional(),
});
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Email must be string" })
        .email({ message: "Invalid email address format." }),
    password: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." }),
    phone: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh." })
        .optional(),
    address: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Address must be string" })
        .optional()
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),
    password: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." })
        .optional(),
    phone: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh." })
        .optional(),
    address: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "Address must be string" })
        .optional(),
    role: zod_1.default
        .enum(Object.values(user_interface_1.Role))
        .optional(),
    picture: zod_1.default
        .string()
        .refine(val => typeof val === "string", { message: "picture link must be string" })
        .optional(),
    agent: agentZodSchema.optional(),
});
