import z from "zod";
import { AgentStatus, Role } from "./user.interface";

const agentZodSchema = z.object({
        approvalStatus: z.enum(Object.values(AgentStatus) as [string], {
        message: "Invalid agent status",
    }),
    commissionRate: z
        .number()
        .min(0, { message: "Commission rate cannot be negative" })
        .max(100, { message: "Commission rate cannot exceed 100%" })
        .optional(),
});

export const createUserZodSchema = z.object({
    name: z
        .string()
        .refine(val => typeof val === "string", { message: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z
        .string()
        .refine(val => typeof val === "string", { message: "Email must be string" })
        .email({ message: "Invalid email address format." }),
    password: z
        .string()
        .refine(val => typeof val === "string", { message: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." }),
    phone: z
        .string()
        .refine(val => typeof val === "string", { message: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh." })
        .optional(),
    address:z
        .string()
        .refine(val => typeof val === "string", { message: "Address must be string" })
        .optional()
})

export const updateUserZodSchema = z.object({
    name: z
        .string()
        .refine(val => typeof val === "string", { message: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),
    password: z
        .string()
        .refine(val => typeof val === "string", { message: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." })
        .optional(),
    phone: z
        .string()
        .refine(val => typeof val === "string", { message: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh." })
        .optional(),
    address:z
        .string()
        .refine(val => typeof val === "string", { message: "Address must be string" })
        .optional(),
    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
    picture: z
        .string()
        .refine(val => typeof val === "string", { message: "picture link must be string" })
        .optional(),

    agent: agentZodSchema.optional(),
})