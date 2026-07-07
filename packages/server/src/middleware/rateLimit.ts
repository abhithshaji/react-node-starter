import config from "@config/config.js";
import { rateLimiterPostgres } from "@config/rateLimiter.js";
import { EApplicationEnvironment } from "@constant/application.js";
import responseMessage from "@constant/responseMessage.js";
import httpError from "@utils/httpError.js";
import type { NextFunction, Request, Response } from "express";

export default (req: Request, _: Response, next: NextFunction) => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return next();
  }

  if (rateLimiterPostgres) {
    rateLimiterPostgres
      .consume(req.ip as string, 1)
      .then(() => {
        next();
      })
      .catch(() => {
        httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429);
      });
  } else {
    // Fallback path in case the rate limiter wasn't initialized
    next();
  }
};
