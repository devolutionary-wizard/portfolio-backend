import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const targetSegment = '/src/'
const envPath = path.resolve(process.cwd())
let newPath = envPath
const index: number = envPath.indexOf(targetSegment)
if (index !== -1) newPath = path.resolve(envPath.substring(0, index))
dotenv.config({ path: path.resolve(newPath, '.env') })

export const getEnv = (key: string): string | number => {
  const envValue = process.env[key]
  if (typeof envValue === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }
  return envValue
}
