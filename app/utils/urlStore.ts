import { createServerFn } from '@tanstack/start';
import { redis } from './redis';

// node-redis docs: https://redis.io/docs/latest/develop/clients/nodejs/

export const getUrls = createServerFn({ method: 'GET' }).handler(async () => {
  const keys = (await redis.keys('url:*')).slice(0, 40);
  const urlDataList = await Promise.all(
    keys.map(async (key) => {
      const rawData = await redis.hGetAll(key);
      const urlData: UrlData = {
        url: rawData.url,
        expiresAt: parseInt(rawData.expiresAt),
      };
      return {
        id: key.split(':')[1],
        ...urlData,
      };
    }),
  );

  return urlDataList;
});

export const getUrl = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const rawData = await redis.hGetAll(`url:${id}`);
    if (!rawData.url) return null;

    const urlData: UrlData = {
      url: rawData.url,
      expiresAt: parseInt(rawData.expiresAt),
    };
    return urlData;
  });

export const createUrl = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    const id = Math.random().toString(36).slice(2, 10);
    const urlData = {
      url: data.url,
      expiresAt: Date.now() + data.ttl * 1000,
    } satisfies UrlData;
    await redis.hSet(`url:${id}`, {
      url: urlData.url,
      expiresAt: urlData.expiresAt.toString(),
    });
    await redis.pExpireAt(`url:${id}`, urlData.expiresAt);
    return id;
  });

type UrlData = {
  url: string;
  expiresAt: number;
};
