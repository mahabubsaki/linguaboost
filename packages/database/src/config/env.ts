import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url()
});

export type Env = z.infer<typeof envSchema>;
const env = envSchema.parse(process.env);
export default env;
