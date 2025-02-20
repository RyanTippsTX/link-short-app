import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export const redis = client;

// // store & retreive a strong
// await client.set('key', 'value');
// const value = await client.get('key');

// // store & retreive a map
// await client.hSet('user-session:123', {
//   name: 'John',
//   surname: 'Smith',
//   company: 'Redis',
//   age: 29,
// });

// let userSession = await client.hGetAll('user-session:123');
// console.log(JSON.stringify(userSession, null, 2));
