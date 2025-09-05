"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post('/login', auth_controller_1.authController.credentialsLogin);
exports.AuthRouter.post('/refresh-token', auth_controller_1.authController.getNewAccessToken);
exports.AuthRouter.post('/logout', auth_controller_1.authController.logoutUser);
