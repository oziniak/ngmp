import express from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { getAutoSuggestUsers } from "./utils";
import { createUser, findUser, getAllUsers, updateUser } from "./service";
import { validateUser } from "./validate-user";
import { userSchema, userSchemaRequired } from "./user-schema";

const userRouter = express.Router();

const { OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

userRouter.get("/", (req, res) => {
  const { login, limit } = req.query;
  const parsedLimit = isNaN(Number(limit)) ? Infinity : Number(limit);
  return res
    .status(200)
    .json(getAutoSuggestUsers(login as string, parsedLimit)(getAllUsers()));
});

userRouter.get("/:id", (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(NOT_FOUND).send();
  }
  return res.status(OK).json(user);
});

userRouter.post("/", validateUser(userSchemaRequired), (req, res) => {
  const newUser = createUser(req.body);

  return res.status(OK).json(newUser);
});

userRouter.put("/:id", validateUser(userSchema), (req, res) => {
  const result = updateUser(req.params.id, req.body);
  if (result) {
    return res.status(OK).json(result);
  }

  return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userToDelete = findUser(id);
  if (!userToDelete) {
    return res
      .status(BAD_REQUEST)
      .json({ message: getReasonPhrase(BAD_REQUEST) });
  }
  userToDelete.isDeleted = true;

  return res.status(OK).json(userToDelete);
});

export { userRouter };
