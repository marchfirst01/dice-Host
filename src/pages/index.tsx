import { IMAGES } from '@assets/index';
import onBoarding from '@assets/onBoarding.gif';
import tooltip from '@assets/tooltip.svg';
import GoogleLoginButton from '@components/socialLogin/googleLoginButton';
import KakaoLoginButton from '@components/socialLogin/kakaoLoginButton';
import NaverLoginButton from '@components/socialLogin/naverLoginButton';
import { getAccessToken } from '@utils/cookie';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 팝업에서 오는 메시지 듣기
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SOCIAL_LOGIN_SUCCESS') {
        console.log('로그인 성공 메시지 받음!');

        // 상태 업데이트
        setIsLoggedIn(true);

        // 즉시 페이지 이동
        router.push('/space');
      }
    };

    window.addEventListener('message', handleMessage);

    // 기존 로그인 체크
    const token = getAccessToken();
    if (token) {
      setIsLoggedIn(true);
      router.push('/space');
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router]);

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인된 상태면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-8">
      {/* 온보딩 이미지 섹션 */}
      <div className="mb-8 flex w-full max-w-sm flex-col items-center space-y-4">
        <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px]">
          <Image src={onBoarding} alt="로고 이미지" fill className="object-contain" priority />
        </div>
      </div>

      {/* 설명 텍스트 섹션 */}
      <div className="mb-8 flex w-full max-w-[400px] flex-col items-center justify-center gap-2 px-4">
        <p className="text-style-SUB1 text-center">여유 공간 등록하고, 손쉽게 호스트 되기</p>
        <p className="text-style-SUB3 text-center text-medium_gray">
          비어있는 공간을 등록하면, 팝업을 운영하고 싶은
          <br />
          소규모 브랜드와 연결되어 수익을 창출할 수 있어요.
        </p>
      </div>

      {/* 로그인 버튼 섹션 */}
      <div className="flex w-full max-w-[400px] flex-col items-center justify-center space-y-[11px] px-5 pb-5 pt-4">
        <Image src={tooltip} alt="tooltip" />

        <div className="flex w-full flex-row justify-center gap-3">
          <KakaoLoginButton />
          <GoogleLoginButton />
          <NaverLoginButton />
        </div>

        <button
          onClick={() => router.push(`/member/login`)}
          className="flex w-full flex-row items-center justify-center space-x-2 rounded-lg border border-stroke bg-white p-4"
        >
          <Image src={IMAGES.DiceBlack} alt="주사위" />
          <p className="font-BTN1 text-BTN1 text-black">다이스 아이디로 로그인</p>
        </button>

        <div className="flex flex-row items-center justify-center">
          <p className="py-2.5 font-BTN1 text-BTN1 text-medium_gray">아직 회원이 아니신가요?</p>
          <button
            onClick={() => router.push(`/member/register`)}
            className="px-4 py-2.5 font-BTN1 text-BTN1 text-medium_gray underline"
          >
            회원으로 가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
