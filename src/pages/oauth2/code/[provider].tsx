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
          // 쿠키에 토큰 저장 (팝업이든 아니든 항상 저장)
          setCookie('accessToken', accessToken as string, 7);
          setCookie('refreshToken', refreshToken as string, 30);

          console.log(`${provider} 로그인 성공`);

          // 팝업 창인지 확인
          if (window.opener && !window.opener.closed) {
            // 팝업인 경우: 부모 창에 메시지 전달 후 팝업 닫기
            window.opener.postMessage(
              {
                type: 'SOCIAL_LOGIN_SUCCESS',
                accessToken,
                refreshToken,
              },
              window.location.origin,
            );

            // 팝업 창 닫기
            window.close();
          } else {
            // 팝업이 아닌 경우 (직접 접근한 경우): 페이지 이동
            router.replace('/space');
          }
        } catch (error) {
          console.error('로그인 처리 오류:', error);
          router.replace('/?error=login_failed');
        }
      } else {
        console.error('토큰이 없습니다.');
        router.replace('/?error=no_token');
      }
    }
  }, [router.isReady, router.query, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}
