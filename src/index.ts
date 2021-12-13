import "reflect-metadata";
import express, { Request } from "express";
import { userRouter } from "./routers/controllers/user-controller";
import { groupRouter } from "./routers/controllers/group-controller";
import { db } from "./db";

const app = express();

app.use(express.json());

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

app.listen(process.env.PORT);
