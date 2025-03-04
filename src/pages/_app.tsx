import { IMAGES } from '@assets/index';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from '@utils/token';

import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(false);
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false); // Naver Map script 로딩 상태 관리

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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(getAccessToken() ? true : false);

    if (isLoggedIn && router.pathname.startsWith('/member')) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NMFClientId}&submodules=geocoder`}
        strategy="lazyOnload" // 비동기적으로 로드
        onLoad={() => {
          setIsMapScriptLoaded(true); // 스크립트 로드 완료 시 상태 업데이트
        }}
      />
      {loading || !isMapScriptLoaded ? ( // 지도 스크립트가 로드되었을 때만 페이지를 렌더링
        <div className="flex h-screen flex-col items-center justify-center">
          <Image src={IMAGES.DiceLoading} alt="loading" />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
}
