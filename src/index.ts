import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers/controllers/user-controller";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.PORT);
