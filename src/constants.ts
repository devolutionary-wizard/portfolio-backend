import { getEnv } from "./core/config";

export const NODE_ENV = getEnv('NODE_ENV') as string;
export const PORT = getEnv('PORT') as number;

export const DB_HOST = getEnv('DB_HOST') as string;
export const DB_PORT = getEnv('DB_PORT') as number;
export const DB_USERNAME = getEnv('DB_USERNAME') as string;
export const DB_PASSWORD = getEnv('DB_PASSWORD') as string;
export const DB_DATABASE = getEnv('DB_DATABASE') as string;
