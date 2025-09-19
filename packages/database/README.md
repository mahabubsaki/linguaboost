# @repo/database

Centralized database package for the LinguaBoost monorepo using Drizzle ORM with Supabase PostgreSQL and Redis.

## Features

- 🗄️ **PostgreSQL with Drizzle ORM** - Type-safe database operations
- ☁️ **Supabase Integration** - Cloud PostgreSQL with additional features
- 🚀 **Redis Cache** - High-performance caching and session management
- 📝 **Schema Validation** - Zod-based input validation
- 🔄 **Migrations** - Database schema versioning
- 🌱 **Seeding** - Sample data for development
- 🔗 **Connection Management** - Automatic connection handling

## Installation

This package is automatically available in the monorepo workspace:

```json
{
  "dependencies": {
    "@repo/database": "workspace:*"
  }
}
```

## Quick Start

### Basic Usage

```typescript
import { db, users, ConnectionManager } from '@repo/database';

// Initialize connections
await ConnectionManager.initialize();

// Query users
const allUsers = await db.select().from(users);

// Create a user
const newUser = await db.insert(users).values({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe'
}).returning();
```

### Redis Cache

```typescript
import { RedisCache, RedisSession } from '@repo/database';

// Cache data
await RedisCache.set('user:123', { name: 'John' }, 3600); // 1 hour TTL
const userData = await RedisCache.get('user:123', true); // Parse as JSON

// Session management
await RedisSession.create('session-id', { userId: '123' });
const session = await RedisSession.get('session-id');
```

## Database Schema

### Core Tables

- **users** - User accounts and basic information
- **userProfiles** - Extended user profiles and preferences
- **languages** - Available languages for learning
- **userLanguages** - User's language learning progress
- **vocabulary** - Language vocabulary entries
- **userVocabulary** - User's vocabulary learning progress
- **learningSessions** - Learning session tracking
- **achievements** - Gamification achievements
- **userAchievements** - User's unlocked achievements
- **studyStreaks** - Learning streak tracking

## Configuration

The database is pre-configured for the LinguaBoost Supabase project:

- **Database URL**: `postgresql://postgres:linguaboost@db.engrxkvhviujrrhgxtrc.supabase.co:5432/postgres`
- **Redis URL**: `redis://localhost:6379` (configurable)

## Scripts

```bash
# Build the package
pnpm build

# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Push schema changes
pnpm db:push

# Open Drizzle Studio
pnpm db:studio

# Seed database
pnpm db:seed
```

## Schema Validation

All database operations support Zod validation:

```typescript
import { createUserSchema, CreateUser } from '@repo/database';

const userData: CreateUser = {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe'
};

// Validate before inserting
const validatedData = createUserSchema.parse(userData);
```

## Usage in Apps

### API Server

```typescript
import { db, users, ConnectionManager } from '@repo/database';
import { Hono } from 'hono';

const app = new Hono();

// Initialize database on startup
await ConnectionManager.initialize();

app.get('/users', async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});
```

### Mobile/Web Apps

```typescript
import { supabase, RedisCache } from '@repo/database';

// Use Supabase client for real-time subscriptions
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);

// Cache frequently accessed data
await RedisCache.set(`user:${userId}`, data, 3600);
```

## Connection Management

The package provides automatic connection management:

```typescript
import { ConnectionManager } from '@repo/database';

// Initialize all connections
await ConnectionManager.initialize();

// Clean up connections
await ConnectionManager.cleanup();

// Check if initialized
if (ConnectionManager.initialized) {
  // Database is ready
}
```

## Development

### Adding New Tables

1. Define the table in `src/schema/tables.ts`
2. Add relations if needed
3. Create validation schemas in `src/validation.ts`
4. Generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

### Redis Patterns

The package includes common Redis patterns:

- **Caching**: Store frequently accessed data
- **Sessions**: User session management
- **Rate Limiting**: API rate limiting (can be extended)
- **Queue**: Background job processing (can be extended)

## Best Practices

1. **Always use transactions** for multi-table operations
2. **Validate input data** using provided schemas
3. **Handle connection errors** gracefully
4. **Use Redis for caching** frequently accessed data
5. **Monitor connection pools** in production
6. **Use prepared statements** for repeated queries

## Error Handling

```typescript
import { DatabaseUtils } from '@repo/database';

try {
  await db.insert(users).values(userData);
} catch (error) {
  const errorMessage = DatabaseUtils.formatError(error);
  console.error('Database error:', errorMessage);
}
```

## Environment Variables

While the package currently uses hardcoded values, you can extend it to use environment variables:

```typescript
const DATABASE_URL = process.env.DATABASE_URL || 'default-url';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
```

## License

This package is part of the LinguaBoost monorepo and follows the project's licensing terms.
