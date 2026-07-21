import { Request, Response } from "express";

import mongoose from "mongoose";
import Task from "../models/task.model";
import paginatonHelper from "../../../helper/pagination";
import searchHelper from "../../../helper/search";

// [GET] /api/v1/tasks
export const index = async (req: Request, res: Response) => {
  interface FIND {
    title?: RegExp | string;
    deleted: boolean;
    status?: string;
  }
  const find: FIND = { deleted: false };

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
  const totalPage = await Task.countDocuments(find);
  const objectPagination = paginatonHelper(
    initPagination,
    req.query,
    totalPage,
  );
  //Pagination
  const objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(task);
};

//[PATCH] /api/v1/tasks//change-status/:id
export const change_status = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      },
    );
    res.json({
      message: "Cập nhật trạng thái thành công",
      code: 200,
    });
  } catch {
    res.json({
      message: "Cập nhật trạng thái KHÔNG thành công",
      code: 400,
    });
  }
};
