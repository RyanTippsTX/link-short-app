import { createServerFn } from '@tanstack/start';
import { redis } from './redis';
// import { getRequestHeaders } from 'vinxi/http';

export const getUrls = createServerFn({ method: 'GET' }).handler(async () => {
  const keys = (await redis.keys('url:*')).slice(0, 40);
  const urlDataList = await Promise.all(
    keys.map(async (key) => {
      const urlData = (await redis.hgetall(key)) as any as UrlData;
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
    const urlData = await redis.hgetall(`url:${id}`);
    return urlData as UrlData | null;
  });

export const createUrl = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    const id = Math.random().toString(36).slice(2, 10);
    const urlData = {
      url: data.url,
      expiresAt: Date.now() + data.ttl * 1000,
    } satisfies UrlData;
    await redis.hmset(`url:${id}`, urlData);
    await redis.pexpireat(`url:${id}`, urlData.expiresAt);
    return id;
  });

type UrlData = {
  url: string;
  expiresAt: number;
};
