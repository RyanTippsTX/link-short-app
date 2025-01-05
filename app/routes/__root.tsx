// app/routes/__root.tsx
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import appCss from '~/styles/app.css?url';
import type { ReactNode } from 'react';

const faviconEmoji = [
  //
  // '🩳',
  '🔗',
  // '🌎',
][0];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Url Shortener',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },

      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox="0 0 100 100"><text y=".9em" font-size="90">${faviconEmoji}</text></svg>`,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
