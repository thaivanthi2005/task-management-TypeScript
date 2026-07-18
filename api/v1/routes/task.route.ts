import { Router } from "express";
const router: Router = Router();
import Task from "../models/task.model";
import * as controller from "../controllers/task.controller";
router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const taskRouters: Router = router;
