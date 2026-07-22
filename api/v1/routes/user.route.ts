import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/user.controller";

router.get("/detail/:id", controller.detail);
router.post("/register", controller.register);
router.post("/login", controller.login);

export const userRouters: Router = router;
