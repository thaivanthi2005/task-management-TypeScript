"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        const URL = process.env.MONGO_URL;
        if (!URL) {
            throw new Error("MONGO_URL is not defined in .env");
        }
        await mongoose_1.default.connect(URL);
        console.log("CONNECT SUCCESS");
    }
    catch (error) {
        console.log("CONNECT ERROR", error);
    }
};
exports.connect = connect;
//# sourceMappingURL=database.js.map