import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { createUrl } from '~/utils/urlStore';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  // loader: async () => await getCount(), // equivalent of getSSProps
});

const defaultFormState = { url: '', ttl: 60 };

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  const [formState, setFormState] = useState(defaultFormState);
  const formIsValid = formState.url.length > 0 && formState.ttl > 0;
  const [loading, setLoading] = useState(false);
  const [urlId, setUrlId] = useState<string | null>(null);

  const onFormFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('form data:', formState);
    try {
      const id = await createUrl({ data: formState });
      setFormState(defaultFormState);
      setUrlId(id);
    } catch (error) {
      console.error('Failed to create URL:', error);
    }
    setLoading(false);
  };

  if (urlId) {
    return <Success urlId={urlId} />;
  }

  return (
    <form className="p-4 flex flex-col gap-2 mx-auto" onSubmit={onSubmit} style={{ maxWidth: 400 }}>
      <p>Enter a URL to shorten:</p>
      <label>
        <div className="font-bold text-xs py-1">URL:</div>
        <input
          name="url"
          type="url"
          placeholder="https://www.spacex.com"
          className="p-2 border border-gray-300 w-full"
          value={formState.url}
          onChange={onFormFieldChange}
        />
      </label>
      <label>
        <div className="font-bold text-xs py-1">TTL (seconds):</div>
        <input
          name="ttl"
          type="number"
          placeholder="Time to live (seconds)"
          className="p-2 border border-gray-300 w-full"
          value={formState.ttl}
          onChange={onFormFieldChange}
        />
      </label>
      <button
        disabled={!formIsValid || loading}
        type="submit"
        className="p-2 bg-peach-500 text-white hover:bg-peach-400"
      >
        Submit
      </button>
    </form>
  );
}

const Success = ({ urlId }: { urlId: string }) => {
  const shortUrl = `${window.location.origin}/${urlId}`;
  return (
    <div className="mx-auto p-4">
      <div>URL shortened!</div>
      <div>
        <a href={shortUrl} className="underline">
          {shortUrl}
        </a>
      </div>
    </div>
  );
};
