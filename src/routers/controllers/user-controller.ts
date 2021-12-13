import express, { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Container from "typedi";
import { userSchemaRequired, userSchema } from "../../validators/user-schema";
import { validateUser } from "../../validators/validate-user";
import { UserService } from "../../services/user-service";

const userRouter = express.Router();

const { OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

class UserRouterHandler {
  async getUsers(req: Request, res: Response) {
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

  async getUser(req: Request, res: Response) {
    const userService = Container.get(UserService);
    const user = await userService.getOne(req.params.id);
    if (!user) {
      return res.status(NOT_FOUND).send(getReasonPhrase(NOT_FOUND));
    }
    return res.status(OK).json(user);
  }

  async createUser(req: Request, res: Response) {
    const userDto = req.body;
    const userService = Container.get(UserService);
    try {
      const newUser = await userService.create(userDto);
      return res.status(OK).json(newUser);
    } catch (e) {
      console.error(e);
      return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
    }
  }

  async updateUser(req: Request, res: Response) {
    const userService = Container.get(UserService);
    try {
      const result = await userService.updateUser(req.params.id, req.body);
      return res.status(OK).json(result);
    } catch (e) {
      return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
    }
  }

  async deleteUser(req: Request, res: Response) {
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

userRouter.get("/", handler.getUsers);
userRouter.get("/:id", handler.getUser);
userRouter.post("/", validateUser(userSchemaRequired), handler.createUser);
userRouter.put("/:id", validateUser(userSchema), handler.updateUser);
userRouter.delete("/:id", handler.deleteUser);

export { userRouter };
