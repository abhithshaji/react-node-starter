import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import path from "path";
import router from "@router/apiRouter.js";
import globalErrorHandler from "@middleware/globalErrorHandler.js";
import responseMessage from "@constant/responseMessage.js";
import httpError from "@utils/httpError.js";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    origin: ["*"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "../public")));

// Routes
app.use("/api/v1", router);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND("route"));
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
