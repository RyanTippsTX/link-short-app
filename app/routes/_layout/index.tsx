import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// defines the page content at the given route
export const Route = createFileRoute('/_layout/')({
  component: Home,
  // loader: async () => await getCount(), // equivalent of getSSProps
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  const [formState, setFormState] = useState({
    url: '',
    ttl: 60, // seconds
  });
  const formIsValid = formState.url.length > 0 && formState.ttl > 0;

  const onFormFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form data:', formState);
    // clear form
    setFormState({ url: '', ttl: 60 });
  };

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
        disabled={!formIsValid}
        type="submit"
        className="p-2 bg-peach-500 text-white hover:bg-peach-400"
      >
        Submit
      </button>
    </form>
  );
}
