import type { NextFunction, Request, Response } from "express";
import type { THttpError } from "@appTypes/types.js";

export default (
  err: THttpError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) => {
  res.status(err.statusCode).json(err);
};
