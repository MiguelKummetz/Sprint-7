import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export function createTables() {
  const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username'),
    password: text('password'),
    creationDate: text('creation_date')
  });

  const userRelations = relations(users, ({ many }) => ({
    messages: many(messages)
  }));

  const messages = sqliteTable('messages', {
    id: integer('id').primaryKey(),
    userId: integer('user_id'),
    content: text('content'),
    sendedAt: text('sended_at')
  });

  const messageRelations = relations(messages, ({ one }) => ({
    users: one(users, {
      fields: [messages.userId],
      references: [users.id]
    })
  }));
}
