"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicateErr_1 = require("../helpers/handleDuplicateErr");
const handleZodError_1 = require("../helpers/handleZodError");
const globalErrorHandler = (err, req, res, next) => {
    let message = "Something Went Wrong!!";
    let errorSours = [];
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateErr_1.handlerDuplicateError)(err);
        message = simplifiedError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handlerZodError)(err);
        message = simplifiedError.message;
        errorSours = simplifiedError.errorSours;
    }
    res.status(500).json({
        success: false,
        message,
        errorSours,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null,
        err: env_1.envVars.NODE_ENV === "development" ? err : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
