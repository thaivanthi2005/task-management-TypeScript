import { taskRouters } from "./task.route";
import { userRouters } from "./user.route";
import { Express } from "express";
const mainV1Router = (app: Express) => {
  app.use("/api/v1/tasks", taskRouters);
  app.use("/api/v1/user", userRouters);
};

export default mainV1Router;
