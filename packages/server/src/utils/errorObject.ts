import type { Request } from "express";
import type { THttpError } from "@appTypes/types.js";
import responseMessage from "@constant/responseMessage.js";
import config from "@config/config.js";
import { EApplicationEnvironment } from "@constant/application.js";
import logger from "@utils/logger.js";

export default (
  err: Error | unknown,
  req: Request,
  errorStatusCode: number = 500
): THttpError => {
  const errorObj: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message:
      err instanceof Error
        ? err.message || responseMessage.SOMETHING_WENT_WRONG
        : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null
  };

  logger.error("CONTROLLER_ERROR", { meta: errorObj });

  // Production Env Check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  return errorObj;
};
