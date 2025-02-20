import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export const redis = client;
