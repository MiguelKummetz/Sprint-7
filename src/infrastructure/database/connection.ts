//import tables
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/.';
import * as tables from './tables';
// async fuction createDatabaseAndConnect(): Promise<any> {

// }

const client = createClient({
  url: 'libsql://adjusted-tattoo-miguelkummetz.turso.io',
  authToken: process.env.DB_TOKEN
});

export const db = drizzle(client, { schema: tables });

// const result = await db.select().from(users).all();
