import { createServerFn } from '@tanstack/start';
import { getRequestHeaders } from 'vinxi/http';

export const getUrls = createServerFn({ method: 'GET' }).handler(async () => {
  const host = getRequestHeaders().host;
  const activeUrlStore = Object.entries(urlStore).reduce<URLStore>((acc, [id, data]) => {
    if (data.expiresAt > Date.now()) {
      acc[id] = data;
    }
    return acc;
  }, {});

  return { activeUrlStore, host };
});

export const getUrl = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const urlData = urlStore[id];
    if (urlData && urlData.expiresAt > Date.now()) {
      return urlData;
    }
    return null;
  });

export const createUrl = createServerFn({ method: 'POST' })
  .validator((data: { url: string; ttl: number }) => data)
  .handler(async ({ data }) => {
    const id = Math.random().toString(36).slice(2, 10);
    urlStore[id] = { url: data.url, expiresAt: Date.now() + data.ttl * 1000 };
    return id;
  });

interface URLStore {
  [key: string]: { url: string; expiresAt: number };
}

const urlStore: URLStore = {
  // dummy data
  '01234567': {
    url: 'https://www.spacex.com',
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  },
  '12345678': {
    url: 'https://www.tesla.com',
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  },
  '23456789': {
    url: 'https://www.paypal.com',
    expiresAt: Date.now() - 1000 * 60 * 60 * 24,
  },
};
