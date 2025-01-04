import * as fs from 'node:fs';
import { createServerFn } from '@tanstack/start';

const filePath = 'count.txt';

async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'));
}

export const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount();
});

// can be called anywhere - during SSR or in the browser. Good for fetching data or triggering server-side operations.
export const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });
