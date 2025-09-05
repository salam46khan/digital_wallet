"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requirdEnvVariable = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESS_SECRET", "JWT_REFRESS_EXPIRES", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD"];
    requirdEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing env variable: ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESS_SECRET: process.env.JWT_REFRESS_SECRET,
        JWT_REFRESS_EXPIRES: process.env.JWT_REFRESS_EXPIRES,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    };
};
exports.envVars = loadEnvVariables();
