import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@repo/database/client';
import schemas from '@repo/database/schema';
import { nextCookies } from "better-auth/next-js";
import { jwt, username } from "better-auth/plugins";

import { expo } from '@better-auth/expo';
import { connectRedis, redis } from '@repo/database/redis';
import env from '../config/env';

export const auth = betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    appName: 'Linguaboost',
    trustedOrigins: ["linguaboost:mobile://"],
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            ...schemas
        }
    }),
    emailAndPassword: {
        enabled: true // Enable authentication using email and password.
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 10 * 60, // 10 minutes
        },
    },
    logger: {
        log(level, message, ...args) {
            const levels = {
                info: "ℹ️",
                warn: "⚠️",
                error: "❌",
                debug: "🐞",
                log: "📝",
            };
            const emoji = levels[level] || "";
            const timestamp = new Date().toISOString();
            const formatted = `[${timestamp}] [${level.toUpperCase()}] ${emoji} ${message}`;
            if (console[level]) {
                console[level](formatted, ...args);
            } else {
                console.log(formatted, ...args);
            }
        },
    },
    account: {
        updateAccountOnSignIn: true,
    },
    plugins: [
        jwt({
            jwt: {
                expirationTime: "1h",
                definePayload: async ({ user, session }) => {
                    return {
                        id: user.id,
                        email: user.email,
                        sessionId: session.id,
                    };
                },
            },
        }),
        username(),
        expo(), nextCookies()],
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
        }
    },
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
        },
    }
});
