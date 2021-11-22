import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers/controllers/user-controller";
import { groupRouter } from "./routers/controllers/group-controller";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/group", groupRouter);

app.listen(process.env.PORT);
