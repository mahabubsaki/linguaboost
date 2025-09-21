
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

const userSchema = pgTable('user', {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    email: text('email').notNull(),
    emailVerified: boolean('email_verified').default(false),
    name: text('name').notNull(),
    image: text('image'),
});
export default userSchema;