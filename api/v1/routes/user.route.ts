import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/user.controller";
import requireAuth from "../middleware/auth.middleware";

router.get("/detail/:id", requireAuth, controller.detail);
router.post("/register", controller.register);
router.post("/login", controller.login);

export const userRouters: Router = router;
