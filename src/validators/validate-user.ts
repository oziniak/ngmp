import { Prisma } from ".prisma/client";
import { ValidateFunction } from "ajv";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../types";

export function validateUser<
  T extends Prisma.UserCreateWithoutGroupsInput = Prisma.UserCreateWithoutGroupsInput
>(schema: ValidateFunction<T>) {
  return function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!schema(req.body)) {
      return res.status(StatusCodes.BAD_REQUEST).json(schema.errors);
    }
    next();
  };
}
