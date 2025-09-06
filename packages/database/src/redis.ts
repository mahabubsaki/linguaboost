import { createClient } from 'redis';

// Redis configuration
const REDIS_URL = process.env.REDIS_URL; // You can change this to your Redis URL

// Create Redis client
export const redis = createClient({
  url: REDIS_URL
});

// Redis connection event handlers
redis.on('connect', () => {
  console.log('✅ Redis client connected');
});

redis.on('ready', () => {
  console.log('✅ Redis client ready');
});

redis.on('error', (err) => {
  console.error('❌ Redis client error:', err);
});

redis.on('end', () => {
  console.log('📤 Redis client disconnected');
});

// Connect to Redis
export async function connectRedis() {
  try {
    await redis.connect();
    console.log('✅ Redis connection established');
    return true;
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    return false;
  }
}

// Disconnect from Redis
export async function disconnectRedis() {
  try {
    await redis.disconnect();
    console.log('✅ Redis disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting Redis:', error);
  }
}

// Redis utility functions
export class RedisCache {
  // Set a key-value pair with optional expiration
  static async set(key: string, value: string | object, ttlSeconds?: number): Promise<boolean> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

      if (ttlSeconds) {
        await redis.setEx(key, ttlSeconds, stringValue);
      } else {
        await redis.set(key, stringValue);
      }

      return true;
    } catch (error) {
      console.error('❌ Redis SET error:', error);
      return false;
    }
  }

  // Get a value by key
  static async get<T = string>(key: string, parseJson = false): Promise<T | null> {
    try {
      const value = await redis.get(key);

      if (value === null) return null;

      if (parseJson) {
        try {
          return JSON.parse(value) as T;
        } catch {
          return value as T;
        }
      }

      return value as T;
    } catch (error) {
      console.error('❌ Redis GET error:', error);
      return null;
    }
  }

  // Delete a key
  static async del(key: string): Promise<boolean> {
    try {
      const result = await redis.del(key);
      return result > 0;
    } catch (error) {
      console.error('❌ Redis DEL error:', error);
      return false;
    }
  }

  // Check if a key exists
  static async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('❌ Redis EXISTS error:', error);
      return false;
    }
  }

  // Set expiration on a key
  static async expire(key: string, ttlSeconds: number): Promise<boolean> {
    try {
      const result = await redis.expire(key, ttlSeconds);
      return result;
    } catch (error) {
      console.error('❌ Redis EXPIRE error:', error);
      return false;
    }
  }

  // Get all keys matching a pattern
  static async keys(pattern: string): Promise<string[]> {
    try {
      return await redis.keys(pattern);
    } catch (error) {
      console.error('❌ Redis KEYS error:', error);
      return [];
    }
  }

  // Flush all data (use with caution!)
  static async flushAll(): Promise<boolean> {
    try {
      await redis.flushAll();
      return true;
    } catch (error) {
      console.error('❌ Redis FLUSHALL error:', error);
      return false;
    }
  }
}

// Session management utilities
export class RedisSession {
  private static readonly SESSION_PREFIX = 'session:';
  private static readonly DEFAULT_TTL = 24 * 60 * 60; // 24 hours

  static async create(
    sessionId: string,
    data: object,
    ttlSeconds = RedisSession.DEFAULT_TTL
  ): Promise<boolean> {
    const key = `${RedisSession.SESSION_PREFIX}${sessionId}`;
    return await RedisCache.set(key, data, ttlSeconds);
  }

  static async get<T = object>(sessionId: string): Promise<T | null> {
    const key = `${RedisSession.SESSION_PREFIX}${sessionId}`;
    return await RedisCache.get<T>(key, true);
  }

  static async update(
    sessionId: string,
    data: object,
    ttlSeconds = RedisSession.DEFAULT_TTL
  ): Promise<boolean> {
    const key = `${RedisSession.SESSION_PREFIX}${sessionId}`;
    return await RedisCache.set(key, data, ttlSeconds);
  }

  static async destroy(sessionId: string): Promise<boolean> {
    const key = `${RedisSession.SESSION_PREFIX}${sessionId}`;
    return await RedisCache.del(key);
  }

  static async exists(sessionId: string): Promise<boolean> {
    const key = `${RedisSession.SESSION_PREFIX}${sessionId}`;
    return await RedisCache.exists(key);
  }
}

export { redis as redisClient };
