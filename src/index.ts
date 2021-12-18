import "reflect-metadata";
import morgan from "morgan";
import express, { Request } from "express";
import { userRouter } from "./routers/controllers/user-controller";
import { groupRouter } from "./routers/controllers/group-controller";
import { db } from "./db";
import { appLogger } from "./logger";
import { errorHandler } from "./error-handler";

process.on("uncaughtException", (error: Error) => {
  appLogger.error(`Uncaught exception, shutting down: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  appLogger.error(`Unhandled exception, in promise, ${error}`);
});

const app = express();

app.use(express.json());

app.use(morgan("tiny"));
app.use("/user", userRouter);
app.use("/group", groupRouter);

app.post(
  "/add-users-to-group",
  async (req: Request<{}, {}, { userIds: number[]; groupId: number }>, res) => {
    const { userIds, groupId } = req.body;
    // prisma uses transaction for dependant writes under the hood
    const resp = await db.group.update({
      where: { id: groupId },
      data: {
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });

    res.json(resp);
  }
);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  appLogger.info(`Server is listening on port ${process.env.PORT}`)
);
