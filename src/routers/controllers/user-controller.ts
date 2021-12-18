import express, { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Container from "typedi";
import { userSchemaRequired, userSchema } from "../../validators/user-schema";
import { validateUser } from "../../validators/validate-user";
import { UserService } from "../../services/user-service";
import { catchErrors } from "../../decorators/catch-errors";
import { logTime } from "../../decorators/log-time";

const userRouter = express.Router();

const { OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

@catchErrors
@logTime
class UserRouterHandler {
  async handleGetUsers(req: Request, res: Response) {
    const userService = Container.get(UserService);
    const { login = "", limit } = req.query;
    let resp;
    if (login || limit) {
      const parsedLimit = isNaN(Number(limit)) ? 0 : Number(limit);
      resp = await userService.getByLogin(login as string, parsedLimit);
    } else {
      resp = await userService.getAll();
    }

    return res.status(200).json(resp);
  }

  async handleGetUser(req: Request, res: Response) {
    const userService = Container.get(UserService);
    const user = await userService.getOne(req.params.id);
    if (!user) {
      return res.status(NOT_FOUND).send(getReasonPhrase(NOT_FOUND));
    }
    return res.status(OK).json(user);
  }

  async handleCreateUser(req: Request, res: Response) {
    const userDto = req.body;
    const userService = Container.get(UserService);
    try {
      const newUser = await userService.create(userDto);
      return res.status(OK).json(newUser);
    } catch (e) {
      return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
    }
  }

  async handleUpdateUser(req: Request, res: Response) {
    const userService = Container.get(UserService);
    try {
      const result = await userService.updateUser(req.params.id, req.body);
      return res.status(OK).json(result);
    } catch (e) {
      return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
    }
  }

  async handleDeleteUser(req: Request, res: Response) {
    const userService = Container.get(UserService);
    try {
      const result = await userService.softDelete(req.params.id);
      return res.status(OK).json(result);
    } catch (e) {
      return res
        .status(BAD_REQUEST)
        .json({ message: getReasonPhrase(BAD_REQUEST) });
    }
  }
}

const handler = new UserRouterHandler();

userRouter.get("/", handler.handleGetUsers);
userRouter.get("/:id", handler.handleGetUser);
userRouter.post(
  "/",
  validateUser(userSchemaRequired),
  handler.handleCreateUser
);
userRouter.put("/:id", validateUser(userSchema), handler.handleUpdateUser);
userRouter.delete("/:id", handler.handleDeleteUser);

export { userRouter };
