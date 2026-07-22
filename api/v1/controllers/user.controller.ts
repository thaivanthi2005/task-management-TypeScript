import md5 from "md5";
import User from "../models/user.model";
import {
  generateRandomString,
  generateRandomNumber,
} from "../../../helper/generate";

import sendMailHelper from "../../../helper/sendMail";

// [POST] /api/v1/users/register
export const register = async (req, res) => {
  req.body.password = md5(req.body.password);
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (exitsEmail) {
    res.json({
      code: 400,
      message: "EMAIL ĐÃ TỒN TẠI",
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      token: generateRandomString(20),
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

// [POST] /api/v1/users/login
export const login = async (req, res) => {
  const email: string = req.body.email;
  const password: string = md5(req.body.password);
  const user = await User.findOne({
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
