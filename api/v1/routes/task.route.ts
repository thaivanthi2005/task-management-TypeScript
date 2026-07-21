import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/task.controller";
router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.change_status);
router.patch("/change-multi", controller.changeMulti);
router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteTask);

export const taskRouters: Router = router;
