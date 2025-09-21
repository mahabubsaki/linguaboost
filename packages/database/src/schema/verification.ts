import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const verificationSchema = pgTable('verificationToken', {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    identifier: text('identifier').notNull(),
});

export default verificationSchema;