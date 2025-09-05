import { IMAGES } from '@assets/index';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from '@utils/cookie';

import { useEffect, useState } from 'react';

// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(false);
  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false); // 카카오맵 script 로딩 상태 관리

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

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
    // <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            setIsKakaoMapScriptLoaded(true);
          });
        }}
      />
      {loading || !isKakaoMapScriptLoaded ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <Image src={IMAGES.DiceLoading} priority alt="loading" width={150} height={150} />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
    // </SessionProvider>
  );
}
