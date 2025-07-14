import { IMAGES } from '@assets/index';
import KakaoLoginButton from '@components/kakaoLogin/kakaoLoginButton';
import { getAccessToken } from '@utils/token';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getAccessToken() ? true : false);
  }, []);

  return isLoggedIn ? (
    router.push('/space')
  ) : (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <Image src={IMAGES.LogoBlack} alt="로고 이미지" />
        <p className="text-center font-SUB2 text-SUB2">팝업 운영 올인원 솔루션</p>
      </div>

      <div className="fixed bottom-[34px] w-full max-w-[400px] space-y-[11px] px-5 pb-5 pt-4">
        <button
          onClick={() => router.push(`/member/login`)}
          className="flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-black p-4"
        >
          <Image src={IMAGES.DiceWhite} alt="주사위" />
          <p className="font-BTN1 text-BTN1 text-white">다이스 아이디로 로그인</p>
        </button>
        <div className="w-full">
          <KakaoLoginButton />
        </div>
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
