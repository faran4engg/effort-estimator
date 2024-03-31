'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import useIsMounted from '@/hooks/useIsMounted';
import { GA_TRACKING_ID, pageview } from '../gtag';

const GoogleAnalytics = () => {
  const { events } = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) return <>...</>;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('consent', 'default', {
                            'analytics_storage': 'granted'
                    });
                    
                    gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                    });
                    `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
