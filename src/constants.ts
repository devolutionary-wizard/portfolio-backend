import { getEnv } from "./core/config";

export const NODE_ENV = getEnv('NODE_ENV') as string;
export const PORT = getEnv('PORT') as number;
