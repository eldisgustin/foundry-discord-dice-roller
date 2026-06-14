import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../db/lib/prisma_generated/client.ts";
export type { Actor } from "../db/lib/prisma_generated/client.ts";

const url = process.env.DATABASE_URL;
const adapter = new PrismaBetterSqlite3({ url: url });

export const prisma = new PrismaClient({
  adapter: adapter,
});
