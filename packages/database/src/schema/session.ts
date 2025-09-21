import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const sessionSchema = pgTable('session', {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    userId: text('user_id').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
});
export default sessionSchema;