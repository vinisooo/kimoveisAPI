import express, { Application } from "express";
import { userRouter } from "./routers/users.routes";

const app: Application = express();
app.use(express.json());

app.use("/users",userRouter);

export default app
