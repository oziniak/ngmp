import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

const { UNAUTHORIZED, FORBIDDEN } = StatusCodes;

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const [, token] = (req.headers.authorization || "").split(" ");
  if (!token) {
    return res.sendStatus(UNAUTHORIZED);
  }
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
    if (err) {
      return res.sendStatus(FORBIDDEN);
    }

    next();
  });
}
