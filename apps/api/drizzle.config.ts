import type { Config } from "drizzle-kit";
import * as process from "node:process";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

console.log(process.env.DATABASE_URL);
const nonPoolingUrl = process.env.DATABASE_URL;

const config: Config = {
  schema: "./src/database/schemas/*",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
};

export default config;
