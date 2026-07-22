"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const mainV1Router = (app) => {
    app.use("/api/v1/tasks", auth_middleware_1.default, task_route_1.taskRouters);
    app.use("/api/v1/user", user_route_1.userRouters);
};
exports.default = mainV1Router;
//# sourceMappingURL=index.route.js.map