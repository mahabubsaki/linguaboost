import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import client, { testConnection } from '@repo/database/client'
import { RedisSession, connectRedis } from '@repo/database/redis'
import { auth } from './lib/auth';
import { cors } from "hono/cors";
import env from './config/env';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './lib/trpc';
import jwt from 'jsonwebtoken';
import { logger } from 'hono/logger'


const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>();
app.use(logger())
app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: [], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});


app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});


app.get('/', (c) => {
  return c.text('Hello Hono! API Server is running.');
});

app.get('/test', async (c) => {
  try {

    const redis = await RedisSession.exists('allData', 'data:')
    console.log('Redis exists:', redis);
    let data = []
    if (!redis) {
      data = await client.db.query.test.findMany()
      RedisSession.create('allData', data, 'data:')
    } else {
      data = await RedisSession.get('allData', 'data:') as unknown[]
    }


    return c.json(data)
  } catch (error) {
    console.error('Error fetching test data:', error)
    return c.json({ error: 'Failed to fetch test data' }, 500)
  }

})

app.use(
  '/api/trpc/*',
  trpcServer({
    endpoint: '/api/trpc',
    router: appRouter,
    createContext: async (_opts, c) => {
      const jwtToken = c.req.header('Authorization')?.split(' ')[1] || ''
      const decoded = jwt.decode(jwtToken);
      console.log("Decoded JWT:", decoded);
      if (!jwtToken) {
        console.log("❌ No token provided");
      }
      // TODO: verify token and extract user info from database
      return {
        user: {
          id: '0',
          email: 'test@gmail'
        },
        c
      };
    },
  })
)

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT
  },
  async (info) => {
    await connectRedis();
    await testConnection()
    console.log(`API Server is running on http://localhost:${info.port}`);
    console.log('Available endpoints:');
    console.log('  GET  /health');
    console.log('  GET  /test');
    console.log('  /api/auth/*  (for authentication)');
    console.log('  /api/trpc/*  (for tRPC endpoints)');
  }
);
