// _app.tsx
import { fetchFCMCurrentToken } from '@api/fcm';
import { IMAGES } from '@assets/index';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from '@utils/cookie';
import { getMessagingInstance } from '@utils/settingFCM';

import { useEffect, useState } from 'react';

import { getToken, onMessage } from 'firebase/messaging';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Router } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(false);
  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로그인 상태 체크 (페이지 이동 시마다)
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // 페이지 이동 시마다 로그인 상태 체크
    Router.events.on('routeChangeComplete', checkLoginStatus);

    return () => {
      Router.events.off('routeChangeComplete', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    async function setupFCMToken() {
      // 1. 브라우저 환경 체크
      if (typeof window === 'undefined') return;

      // 2. 로그인 상태 체크
      if (!isLoggedIn) {
        console.log('로그인하지 않음 - FCM 토큰 등록 스킵');
        return;
      }

      // 3. Messaging 인스턴스 확인
      const messaging = getMessagingInstance();
      if (!messaging) {
        console.log('이 브라우저는 알림을 지원하지 않습니다.');
        return;
      }

      // 4. 알림 권한 확인
      let permission = Notification.permission;

      // 권한이 아직 결정되지 않았으면 요청
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      // 5. 권한이 허용된 경우에만 토큰 저장
      if (permission === 'granted') {
        console.log('알림 권한이 허용되었습니다.');

        try {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (currentToken) {
            // 6. 이미 저장된 토큰인지 확인 (중복 API 호출 방지)
            const savedToken = localStorage.getItem('fcm_token');

            if (savedToken !== currentToken) {
              // 7. 서버에 토큰 저장
              await fetchFCMCurrentToken(currentToken);

              // 8. localStorage에 저장 (중복 방지용)
              localStorage.setItem('fcm_token', currentToken);
            } else {
              console.log('이미 저장된 토큰입니다.');
            }
          } else {
            console.log('토큰을 가져오지 못했습니다.');
          }
        } catch (err) {
          console.error('토큰을 가져오는 중 에러 발생: ', err);
        }
      } else if (permission === 'denied') {
        console.log('알림 권한이 거부되었습니다.');
      } else {
        console.log('사용자가 알림 권한을 결정하지 않았습니다.');
      }
    }

    setupFCMToken();
  }, [isLoggedIn]);

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

      if (Notification.permission === 'granted' && payload.notification) {
        const notification = new Notification(payload.notification.title || '새 알림', {
          body: payload.notification.body,
          icon: '/favicon.ico',
          data: payload.data,
        });
        alert(notification.body);
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
