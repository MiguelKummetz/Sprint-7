import { Value } from '@libsql/client/.';

/* eslint-disable prettier/prettier */
export interface ServerToClientEvents {
  'chat message': (msg: Value, result: string | undefined, username: Value) => void; //pasar a objeto
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  'chat message': (msg: string, username: string) => void;
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
