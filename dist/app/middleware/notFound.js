"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    });
};
exports.default = notFound;
