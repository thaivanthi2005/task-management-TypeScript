import { taskRouters } from "./task.route";
import { Express } from "express";
const mainV1Router = (app: Express) => {
  app.use("/api/v1/tasks", taskRouters);
};

export default mainV1Router;
