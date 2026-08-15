import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "chitra_db",
  DB_PORT: process.env.DB_PORT || 3306,
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret",
};

export default env;
