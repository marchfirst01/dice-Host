import { IMAGES } from '@assets/index';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Router } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    // Cleanup the event listeners
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NMFClientId}&submodules=geocoder`}
        strategy="lazyOnload" // 스크립트를 페이지가 로드된 후에 비동기적으로 로드
        onLoad={() => {
          console.log('Naver Maps script loaded successfully.');
          // 스크립트가 로드된 후 실행할 코드
        }}
      />
      {loading ? (
        <div className="flex h-screen flex-row">
          <Image src={IMAGES.DiceLoading} alt="loading" />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
}
