"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const handlerDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    return {
        message: `${match[1]} already exsit`
    };
};
exports.handlerDuplicateError = handlerDuplicateError;
