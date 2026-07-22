"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.create = exports.changeMulti = exports.change_status = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../../../helper/pagination"));
const search_1 = __importDefault(require("../../../helper/search"));
// [GET] /api/v1/tasks
const index = async (req, res) => {
    const find = { deleted: false };
    const sort = {};
    if (req.query.sortKey && req.query.value) {
        const sortKey = req.query.sortKey.toString();
        const value = req.query.value.toString();
        sort[sortKey] = value;
    }
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    //Pagination
    const initPagination = {
        currentPage: 1,
        limitTask: 2,
    };
    const totalPage = await task_model_1.default.countDocuments(find);
    const objectPagination = (0, pagination_1.default)(initPagination, req.query, totalPage);
    //Pagination
    const objectSearch = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    const tasks = await task_model_1.default.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    res.json(tasks);
};
exports.index = index;
// [GET] /api/v1/tasks/detail/:id
const detail = async (req, res) => {
    const id = req.params.id;
    const task = await task_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(task);
};
exports.detail = detail;
//[PATCH] /api/v1/tasks//change-status/:id
const change_status = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await task_model_1.default.updateOne({
            _id: id,
        }, {
            status: status,
        });
        res.json({
            message: "Cập nhật trạng thái thành công",
            code: 200,
        });
    }
    catch {
        res.json({
            message: "Cập nhật trạng thái KHÔNG thành công",
            code: 400,
        });
    }
};
exports.change_status = change_status;
//[PATCH] /api/v1/tasks//change-multi
const changeMulti = async (req, res) => {
    try {
        let Key;
        (function (Key) {
            Key["STATUS"] = "status";
            Key["DELETE"] = "delete";
        })(Key || (Key = {}));
        const { ids, key, value } = req.body;
        switch (key) {
            case Key.STATUS:
                await task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
                res.json({
                    message: "Cập nhật trạng thái thành công",
                    code: 200,
                });
                break;
            case Key.DELETE:
                await task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    deleted: true,
                    deletedAt: new Date(),
                });
                res.json({
                    message: "Cập nhật trạng thái thành công",
                    code: 200,
                });
                break;
            default:
                res.json({
                    message: "Cập nhật trạng thái KHÔNG thành công",
                    code: 400,
                });
                break;
        }
    }
    catch (error) {
        res.json({
            message: "Cập nhật trạng thái KHÔNG thành công",
            code: 400,
        });
    }
};
exports.changeMulti = changeMulti;
// [POST] /api/v1/tasks/create
const create = async (req, res) => {
    try {
        const task = new task_model_1.default(req.body);
        const data = await task.save();
        res.json({
            code: 200,
            message: "TẠO THÀNH CÔNG ____!",
            data: data,
        });
    }
    catch {
        res.json({
            code: 400,
            message: "TẠO THẤT BẠN !!!!",
        });
    }
};
exports.create = create;
// [DELETE] /api/v1/tasks/delete/:id
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        await task_model_1.default.deleteOne({ _id: id });
        res.json({
            code: 200,
            messsage: "Xóa thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            messsage: "Xóa không thành công !!! LỖI !!!",
        });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map