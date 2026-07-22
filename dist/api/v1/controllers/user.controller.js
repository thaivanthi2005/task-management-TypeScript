"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_1 = require("../../../helper/generate");
// [POST] /api/v1/users/register
const register = async (req, res) => {
    req.body.password = (0, md5_1.default)(req.body.password);
    const exitsEmail = await user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (exitsEmail) {
        res.json({
            code: 400,
            message: "EMAIL ĐÃ TỒN TẠI",
        });
    }
    else {
        const user = new user_model_1.default({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: (0, generate_1.generateRandomString)(20),
        });
        user.save();
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "THÊM USER THÀNH CÔNG ",
            token: token,
        });
    }
    console.log(req.body);
};
exports.register = register;
// [POST] /api/v1/users/login
const login = async (req, res) => {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const user = await user_model_1.default.findOne({
        email: email,
        deleted: false,
    });
    if (!user) {
        res.json({
            code: 400,
            message: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG ( EMAIL KHÔNG TỒN TẠI )",
        });
        return;
    }
    if (password !== user.password) {
        res.json({
            code: 400,
            message: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG ( SAI MẬT KHẨU )",
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token);
    res.json({
        code: 200,
        message: "ĐĂNG NHẬP THÀNH CÔNG",
    });
};
exports.login = login;
// [GET] /api/v1/users/detail
const detail = async (req, res) => {
    res.json({
        code: 200,
        message: "TEST",
        info: req.user,
    });
};
exports.detail = detail;
//# sourceMappingURL=user.controller.js.map