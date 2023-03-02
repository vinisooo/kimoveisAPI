import "express-async-errors";
import { loginRouter } from './routers/login.routes';
import express, { Application } from "express";
import { userRouter } from "./routers/users.routes";
import { handleError } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(handleError);

export default app
