import { Request, Response } from "express";

import mongoose from "mongoose";
import Task from "../models/task.model";

export const index = async (req: Request, res: Response) => {
  interface FIND {
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
  const tasks = await Task.find(find).sort(sort);
  console.log(req.query);
  res.json(tasks);
};

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
