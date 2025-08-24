import { IMAGES } from '@assets/index';
import { GoogleLoginButton } from '@components/socialLogin/googleLoginButton';
import KakaoLoginButton from '@components/socialLogin/kakaoLoginButton';
import { NaverLoginButton } from '@components/socialLogin/naverLoginButton';
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
        <p className="text-style-SUB2 text-center text-SUB2">팝업 운영 올인원 솔루션</p>
      </div>
      <div className="mx-5 flex flex-col items-center justify-center gap-2">
        <p className="text-style-SUB1">여유 공간 등록하고, 손쉽게 호스트 되기</p>
        <p className="text-style-SUB3 text-center text-medium_gray">
          비어있는 공간을 등록하면, 팝업을 운영하고 싶은
          <br />
          소규모 브랜드와 연결되어 수익을 창출할 수 있어요.
        </p>
      </div>

      <div className="fixed bottom-[34px] w-full max-w-[400px] space-y-[11px] px-5 pb-5 pt-4">
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
