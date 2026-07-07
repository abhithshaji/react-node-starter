import pg from "pg";
import { RateLimiterPostgres } from "rate-limiter-flexible";

export let rateLimiterPostgres: null | RateLimiterPostgres = null;

const DURATION = 60;
const POINTS = 10;

export const initRateLimiter = async (pool: pg.Pool) => {
  rateLimiterPostgres = new RateLimiterPostgres({
    storeClient: pool,
    points: POINTS,
    duration: DURATION,
    tableName: "api_rate_limits",
    keyPrefix: "middleware"
  });
};
