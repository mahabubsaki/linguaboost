import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import env from './config/env';
import schema from './schema';

// Database connection string
const DATABASE_URL = env.DATABASE_URL;

// Create Postgres client for Drizzle
const client = postgres(DATABASE_URL, {
  prepare: false, // Disable prepared statements for better compatibility
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 30 // Connection timeout
});

// Create Drizzle instance
export const db = drizzle(client, {
  schema: {
    ...schema
  }
});

// Database connection test
export async function testConnection() {
  try {
    const result = await client`SELECT 1 as test`;

    console.log('✅ Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Close database connection (useful for cleanup)
export async function closeConnection() {
  try {
    await client.end();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
}

// Export the postgres client for advanced usage
export { client as postgresClient };
