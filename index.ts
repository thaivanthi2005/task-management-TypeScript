import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import mainV1Router from "./api/v1/routes/index.route";
import cors from "cors";
const app: Express = express();

const port: number | string = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
dotenv.config();
database.connect();

mainV1Router(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
