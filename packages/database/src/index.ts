import { closeConnection, testConnection } from './client.js';
import { connectRedis, disconnectRedis } from './redis.js';

// Re-export commonly used Drizzle utilities
export { eq, and, or, not, isNull, isNotNull, like, ilike, desc, asc } from 'drizzle-orm';
export type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Connection management
export class ConnectionManager {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Test database connection
      const dbConnected = await testConnection();
      if (!dbConnected) {
        throw new Error('Failed to connect to database');
      }

      // Connect to Redis
      const redisConnected = await connectRedis();
      if (!redisConnected) {
        console.warn('⚠️ Redis connection failed, continuing without Redis');
      }

      this.isInitialized = true;
      console.log('✅ Database package initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database package:', error);
      throw error;
    }
  }

  static async cleanup(): Promise<void> {
    try {
      await closeConnection();
      await disconnectRedis();
      this.isInitialized = false;
      console.log('✅ Database connections cleaned up');
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
      throw error;
    }
  }

  static get initialized(): boolean {
    return this.isInitialized;
  }
}
