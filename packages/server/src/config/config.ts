import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export default {
  // General
  ENV: process.env.ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_URL: process.env.SERVER_URL,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  MONGODB_URL: process.env.MONGODB_URL
};
