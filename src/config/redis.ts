import { Redis } from "ioredis";

const redis = new Redis({
  port: process.env.CACHE_PORT,
  host: process.env.CACHE_HOST,
  password: process.env.CACHE_PASSWORD,
  db: 0,
} as any);

export default redis;
