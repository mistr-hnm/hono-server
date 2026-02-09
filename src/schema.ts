import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length: 10 }).notNull(),
})
