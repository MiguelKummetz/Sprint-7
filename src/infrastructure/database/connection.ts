//import tables
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/.';

// async fuction createDatabaseAndConnect(): Promise<any> {

// }

const client = createClient({
  url: 'libsql://adjusted-tattoo-miguelkummetz.turso.io',
  authToken: process.env.DB_TOKEN
});

const db = drizzle(client);

// const result = await db.select().from(users).all();
