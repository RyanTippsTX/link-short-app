import { createFileRoute, useRouter } from '@tanstack/react-router';
import { getUrls } from '~/utils/urlStore';

export const Route = createFileRoute('/_layout/list')({
  component: Home,
  loader: async () => {
    return await getUrls();
  },
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div>
      {Object.keys(state.activeUrlStore).map((id) => {
        const { url: url, expiresAt } = state.activeUrlStore[id];
        const shortUrl = `${state.host}/${id}`;
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
      })}
    </div>
  );
}
