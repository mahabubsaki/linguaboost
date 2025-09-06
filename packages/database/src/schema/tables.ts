import { pgTable, uuid } from 'drizzle-orm/pg-core';

const test = pgTable('test', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: uuid('name').notNull()
});

export default {
  test
};
