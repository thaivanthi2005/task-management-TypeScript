"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = await user_model_1.default.findOne({
            token: token,
            deleted: false,
        }).select("-password -token");
        if (!user) {
            res.json({
                code: 400,
                message: "Token KHông Hợp lệ !",
            });
            return;
        }
        req.user = user;
        next();
    }
    else {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm token",
        });
    }
};
exports.default = requireAuth;
//# sourceMappingURL=auth.middleware.js.map