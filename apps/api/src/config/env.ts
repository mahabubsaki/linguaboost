import {z} from 'zod';
import dotenv from 'dotenv';

const envSchema = z.object({
    AGENT_SERVICE_URL: z.string().url(),
})
dotenv.config();
const env = envSchema.parse(process.env);

export default env;