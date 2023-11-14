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
      content TEXT
    )
`);

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

  socket.on('chat message', async (msg: object) => {
    let result;
    try {
      result = await db.execute({
        sql: 'INNSERT INTO messages (content) VALUES (:msg)',
        args: { msg }
      });
    } catch (error) {
      console.error(error);
      return;
    }
    io.emit('chat message', msg, result.lastInsertRowid?.toString());
  });
});

app.use(logger('dev'));

app.get('/', (_req: Request, res: any) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
