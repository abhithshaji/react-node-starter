import type { NextFunction, Request, Response } from "express";
import httpResponse from "@utils/httpResponse.js";
import responseMessage from "@constant/responseMessage.js";
import httpError from "@utils/httpError.js";
import quicker from "@utils/quicker.js";

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponse(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthData = {
        application: quicker.getApplicationHealth(),
        system: quicker.getSystemHealth(),
        timeStamp: Date.now()
      };

      httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  }
};
