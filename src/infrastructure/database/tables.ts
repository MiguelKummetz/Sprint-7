import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username'),
  password: text('password'),
  creationDate: text('creation_date')
});

export const userRelations = relations(users, ({ many }) => ({
  messages: many(messages)
}));

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey(),
  userId: integer('user_id'),
  content: text('content'),
  sendedAt: text('sended_at')
});

export const messageRelations = relations(messages, ({ one }) => ({
  users: one(users, {
    fields: [messages.userId],
    references: [users.id]
  })
}));
