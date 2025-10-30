import { IMAGES } from '@assets/index';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from '@utils/cookie';
import { getMessagingInstance } from '@utils/settingFCM';

import { useEffect, useState } from 'react';

import { onMessage } from 'firebase/messaging';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(false);
  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false);

  // 포그라운드 메시지 수신 처리
  useEffect(() => {
    const messaging = getMessagingInstance();
    if (!messaging) {
      console.log('Messaging 인스턴스 없음');
      return;
    }

    console.log('포그라운드 메시지 리스너 등록됨');

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('✅ 포그라운드 메시지 수신!', payload);
      console.log('권한: ', Notification.permission);

      // 알림 표시
      if (Notification.permission === 'granted' && payload.notification) {
        const notification = new Notification(payload.notification.title || '새 알림', {
          body: payload.notification.body,
          // icon 경로를 기존 이미지로 변경 (404 에러 방지)
          icon: '/favicon.ico', // 또는 다른 존재하는 이미지 경로
          data: payload.data,
        });
        alert(notification.title);
        console.log('✅ 알림 표시 완료!');
      } else {
        console.log('❌ 알림 권한:', Notification.permission);
      }
    });

    return () => {
      console.log('포그라운드 메시지 리스너 해제');
      unsubscribe();
    };
  }, []);

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
  );
}
