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
} from '../../core/domain/entieies/ISocket';

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

app.use(express.json());
app.use('/api/users', userRouter);
///////////////////////////////////////////////////

import { gameRouter } from '../application/routes/GameRoutes';
import { GameRepositoriesImpl } from '../infrastructure/repositories/GameRepositoriesImpl';
import { playerRouter } from '../application/routes/PlayerRoutes';
import { PlayerRepositoriesImpl } from '../infrastructure/repositories/PlayerRepositoriesImpl';
import { rankingRouter } from '../application/routes/RankingRoutes';
import { userRouter } from '../application/routes/UserRoutes';

const app = express();
dotenv.config();

databaseConfiguration().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor funcionando en 127.0.0.1:${process.env.PORT}`);
    GameRepositoriesImpl.GameModel = databaseInfo.gameModel;
    PlayerRepositoriesImpl.PlayerModel = databaseInfo.playerModel;
  });
});

app.use(express.json());
app.use('/api/players', playerRouter);
app.use('/api/games', gameRouter);
app.use('/api/ranking', rankingRouter);
