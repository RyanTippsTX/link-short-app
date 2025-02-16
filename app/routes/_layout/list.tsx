import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getUrls } from '~/utils/urlStore';

export const Route = createFileRoute('/_layout/list')({
  component: PageComponent,
  loader: async () => {
    return await getUrls();
  },
});

function PageComponent() {
  const router = useRouter();
  const state = Route.useLoaderData();

  const [host, setHost] = useState<string>(''); //
  useEffect(() => {
    setHost(window?.location?.origin);
  }, []);

  return (
    <div>
      {Object.keys(state.activeUrlStore).map((id) => {
        const { url: url, expiresAt } = state.activeUrlStore[id];
        const shortUrl = `${host}/${id}`;
        return (
          <div key={id} className="p-2 border-b border-gray-300 whitespace-nowrap">
            {/* expiration */}
            <div className="text-sm text-gray-500">
              Expires at {new Date(expiresAt).toLocaleString()}
            </div>
            <div className="flex items-center flex-wrap">
              {/* short url */}
              <div className="text-gray-500">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-peach-500  hover:underline"
                >
                  {shortUrl}
                </a>
              </div>
              {/* url */}
              <div className="flex-1">
                <span className="mx-2">{'→'}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-peach-500 hover:underline"
                >
                  {url}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
