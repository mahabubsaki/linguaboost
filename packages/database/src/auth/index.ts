import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../client.js';
import schemas from '../schema/index.js';

import { expo } from '@better-auth/expo';
import { connectRedis, redis } from '../redis.js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schemas
    }
  }),
  emailAndPassword: {
    enabled: true // Enable authentication using email and password.
  },
  plugins: [expo()],
  secondaryStorage: {
    get: async (key) => {
      await connectRedis();
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      await connectRedis();
      if (ttl) await redis.set(key, value, { EX: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await connectRedis();
      await redis.del(key);
    }
  }
});
