import config from "@config/config.js";
import app from "@/app.js";
import logger from "@utils/logger.js";
// import { initRateLimiter } from "@config/rateLimiter.js";
import databaseService from "@services/databaseService.js";

const server = app.listen(config.SERVER_PORT);

(async () => {
  try {
    // Database Connection
    await databaseService.connect();

    logger.info("DATABASE_CONNECTED", {
      meta: {
        PROVIDER: "Prisma Postgres"
      }
    });

    // // Rate Limiter
    // await initRateLimiter(pool);
    // logger.info("RATE_LIMITER_INITIATED");

    logger.info("APPLICATION_STARTED", {
      meta: {
        SERVER_PORT: config.SERVER_PORT,
        SERVER_URL: config.SERVER_URL
      }
    });
  } catch (error) {
    logger.error("APPLICATION_ERROR", { meta: error });

    server.close(async (closeError) => {
      if (closeError) {
        logger.error("APPLICATION_ERROR", { meta: closeError });
      }

      await databaseService.disconnect();

      process.exit(1);
    });
  }
})();
