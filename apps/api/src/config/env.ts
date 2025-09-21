import { z } from 'zod';
import dotenv from 'dotenv';

const envSchema = z.object({
    AGENT_SERVICE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    PORT: z.string().transform((val) => parseInt(val, 10)).default('3001'),
    CLIENT_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
})
dotenv.config();
const env = envSchema.parse(process.env);

export default env;