import express from "express";
import { userRouter } from "./user/router";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.PORT);
