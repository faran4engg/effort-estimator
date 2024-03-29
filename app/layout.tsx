import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { spaceGroteskFont } from '@/core/fonts';
import TanstackQueryProvider from '@/lib/providers/tanstack-query-provider';
import { theme } from '@/theme/theme';
import '@/styles/global.css';

export const metadata = {
  title: 'Effort Estimator',
  description: 'Effort Estimator',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/icon.png" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width maximum-scale=2 "
          />
        </head>

        <body className={spaceGroteskFont.className}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
