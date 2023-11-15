/* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from '../../domain/entities/ISocket';

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  connectionStateRecovery: {}
});

const db = createClient({
  url: 'libsql://adjusted-tattoo-miguelkummetz.turso.io',
  authToken: process.env.DB_TOKEN
});

//await v
db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      username TEXT
    )
`);

io.on('connection', async (socket) => {
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

  socket.on('chat message', async (msg: string) => {
    console.log(`chat message => ${msg}`);
    let result;
    const username = socket.handshake.auth.username ?? 'anonymous';
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages VALUES (:msg, :username)',
        args: { msg }
      });
    } catch (error) {
      console.error(error);
      return;
    }
    if (result.lastInsertRowid) {
      io.emit('chat message', msg, result.lastInsertRowid.toString(), username); //habría que pasar esto a un objeto
    }
  });

  console.log('auth ⬇');
  console.log(socket.handshake.auth);

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content, username FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      });

      results.rows.forEach((row) => {
        socket.emit('chat message', row.content, row.id?.toString());
      });
      console.log(results);
    } catch (error) {
      console.error(error);
      return;
    }
  }
});

app.use(logger('dev'));

app.get('/', (_req: Request, res: any) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
