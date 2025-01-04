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
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <p className="text-center">Link Shortener</p>
    </div>
  );
}
