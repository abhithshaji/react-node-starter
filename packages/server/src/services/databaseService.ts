import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "@config/config.js";
import pg from "pg";

const connectionString = config.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export default {
  connect: async () => {
    try {
      await prisma.$connect();
      return pool;
    } catch (error) {
      throw error;
    }
  },
  disconnect: async () => {
    await prisma.$disconnect();
    await pool.end();
  }
};
