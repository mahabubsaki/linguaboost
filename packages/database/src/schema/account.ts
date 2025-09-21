
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const accountSchema = pgTable('account', {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    providerId: text('provider_id').notNull(),
    accountId: text('account_id').notNull(),
    userId: text('user_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
});

export default accountSchema;