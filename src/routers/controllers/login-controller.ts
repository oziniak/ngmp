import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Container from "typedi";
import jwt, { Secret } from "jsonwebtoken";
import { UserService } from "../../services/user-service";

const ONE_USER = 1;
const { OK, FORBIDDEN } = StatusCodes;

const loginRouter = express.Router();

class LoginRouterHandler {
  async handleLogin(req: Request, res: Response) {
    const userService = Container.get(UserService);

    const [user] = await userService.getByLogin(req.body.login, ONE_USER, {
      password: true,
    });

    if (!user) {
      return res.sendStatus(FORBIDDEN);
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.sendStatus(FORBIDDEN);
    }

    return res
      .status(OK)
      .json({ token: jwt.sign(user, process.env.TOKEN_SECRET as Secret) });
  }
}

const handler = new LoginRouterHandler();

loginRouter.post("/", handler.handleLogin);

export { loginRouter };
