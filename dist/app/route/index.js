"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const wallet_router_1 = require("../modules/wallet/wallet.router");
const admin_router_1 = require("../modules/admin/admin.router");
exports.routes = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_router_1.UserRouter
    },
    {
        path: '/auth',
        route: auth_router_1.AuthRouter
    },
    {
        path: '/wallet',
        route: wallet_router_1.WalletRouter
    },
    {
        path: '/admin',
        route: admin_router_1.AdminRouter
    }
];
moduleRoutes.forEach((route) => {
    exports.routes.use(route.path, route.route);
});
