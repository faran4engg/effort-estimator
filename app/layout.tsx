import { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics/GoogleAnalytics';
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
          {/* OG Metas */}
          <meta property="og:locale" content="en"></meta>
          <meta property="og:site_name" content="Effort Estimator" />

          {/* HTML Meta Tags  */}
          <title>Effort Estimator: Best Story Estimation App</title>
          <meta
            name="description"
            content="Collaborate seamlessly with your remote teams. Experience real-time interaction, foster dynamic discussions for estimation, and enhance agile ceremonies. "
          />
          {/* Open Graph Meta Tags  */}
          <meta
            property="og:url"
            content="https://effort-estimator.vercel.app/"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Effort Estimator: Best Story Estimation App"
          />
          <meta
            property="og:description"
            content="Collaborate seamlessly with your remote teams. Experience real-time interaction, foster dynamic discussions for estimation, and enhance agile ceremonies. "
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/effort-estimator.appspot.com/o/og-effort-estimator.png?alt=media&token=07b2c1fc-660a-408d-a3a9-a0fb824294bd"
          />
          <meta property="og:image:width" content="1503" />
          <meta property="og:image:height" content="707" />

          {/* Twitter: Open Graph Meta Tags  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="effort-estimator.vercel.app"
          />
          <meta
            property="twitter:url"
            content="https://effort-estimator.vercel.app/"
          />
          <meta
            name="twitter:title"
            content="Effort Estimator: Best Story Estimation App"
          />
          <meta
            name="twitter:description"
            content="Collaborate seamlessly with your remote teams. Experience real-time interaction, foster dynamic discussions for estimation, and enhance agile ceremonies. "
          />
          <meta
            name="twitter:image"
            content="https://firebasestorage.googleapis.com/v0/b/effort-estimator.appspot.com/o/og-effort-estimator.png?alt=media&token=07b2c1fc-660a-408d-a3a9-a0fb824294bd"
          />
        </head>

        <body className={spaceGroteskFont.className}>
          <GoogleAnalytics />
          <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
