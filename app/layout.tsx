import { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import { spaceGroteskFont } from '@/core/fonts';
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
          <link rel="shortcut icon" href="/mascot.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width maximum-scale=2 "
          />
        </head>

        <body className={spaceGroteskFont.className}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
