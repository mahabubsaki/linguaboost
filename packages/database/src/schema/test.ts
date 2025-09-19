import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

const testSchema = pgTable('test', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name')
});

export default testSchema;
