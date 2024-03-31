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
          <link rel="shortcut icon" href="/gauge.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width maximum-scale=2 "
          />
          <meta property="og:title" content="Best Story Estimation App" />
          <meta property="og:site_name" content="Effort Estimator" />
          <meta
            property="og:url"
            content="https://effort-estimator.vercel.app/"
          />
          <meta property="og:description" content="" />
          <meta property="og:type" content="product" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/effort-estimator.appspot.com/o/og-effort-estimator.png?alt=media&token=07b2c1fc-660a-408d-a3a9-a0fb824294bd"
          />

          <meta property="og:locale" content="en"></meta>
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
