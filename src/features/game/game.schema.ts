import { pgTable, serial, varchar, jsonb, integer } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  status: varchar('status', { length: 50 }).notNull(),
  people: jsonb('people').notNull(),
  correctPersonIndex: integer('correct_person_index').notNull(),
});

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
