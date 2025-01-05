import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getUrls } from '~/utils/urlStore';

export const Route = createFileRoute('/_layout/list')({
  component: Home,
  loader: async () => await getUrls(), // equivalent of getSSProps
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      {
        // array from object keys
        Object.keys(state).map((id) => {
          const { url, expiresAt } = state[id];
          const shortUrl = `${window.location.origin}/${id}`;
          return (
            <div key={id} className="p-4 border border-gray-300 flex gap-4 items-center">
              {/* expiration */}
              <div className="text-sm text-gray-500">
                Expires at {new Date(expiresAt).toLocaleString()}
              </div>
              {/* short url */}
              <div className="text-gray-500">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-500 hover:underline"
                >
                  {shortUrl}
                </a>
              </div>
              {'->'}
              {/* url */}
              <div className="flex-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-500 hover:underline"
                >
                  {url}
                </a>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
