import { Request, Response } from "express";

import mongoose from "mongoose";
import Task from "../models/task.model";

export const index = async (req: Request, res: Response) => {
  interface FIND {
    deleted: boolean;
    status?: string;
  }
  const find: FIND = { deleted: false };
  if (req.query.status) {
    find.status = req.query.status.toString();
  }
  const tasks = await Task.find(find);

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
