import redis from 'ioredis';
import { promisify } from 'util';

// password: process.env.REDIS_PASSWORD,
const client = new redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

export const GET_ASYNC = promisify(client.get).bind(client);
export const SET_ASYNC = promisify(client.setex).bind(client);
export const DEL_ASYNC = promisify(client.del).bind(client);
