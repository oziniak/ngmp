import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  req.body.password = await bcrypt.hash(password, SALT_ROUNDS);

  next();
}
