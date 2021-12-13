import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (req.xhr) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Server feels bad, it needs to take a rest" });
  } else {
    next(err);
  }
};
