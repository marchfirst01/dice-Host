// pages/oauth2/code/[provider].tsx
import { setCookie } from '@utils/cookie';

import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function SocialCallback() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { provider, accessToken, refreshToken } = router.query;

      if (accessToken && refreshToken) {
        try {
          setCookie('accessToken', accessToken as string, 7);
          setCookie('refreshToken', refreshToken as string, 30);

          console.log(`${provider} 로그인 성공`); // 'google', 'kakao', 'naver' 등

          router.replace('/space');
        } catch (error) {
          console.error('로그인 처리 오류:', error);
          router.replace('/?error=login_failed');
        }
      } else {
        router.replace('/?error=no_token');
      }
    }
  }, [router.isReady, router.query, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}
