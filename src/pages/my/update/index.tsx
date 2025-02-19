import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MyUpdatePage() {
  const router = useRouter();
  return (
    <div>
      <header className="flex flex-row bg-black">
        <div onClick={() => router.back()} className="cursor-pointer px-3 py-3">
          <Image src={IMAGES.ArrowBackWhite} alt="back" />
        </div>
        <p className="flex-grow py-3 text-center text-white">호스트 정보 수정</p>
        <button className="px-5 text-white">완료</button>
      </header>
      <div className="flex flex-col gap-6 px-5 py-8 font-CAP1 text-CAP1 leading-CAP1 text-dark_gray">
        <div>
          <p>호스트 이름</p>
          <input className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4" />
        </div>
        <div>
          <p>이메일</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input className="h-11 w-full rounded-lg border border-light_gray px-4" />
            <button className="h-11 text-nowrap rounded-lg border border-light_gray px-[41.5px] text-center text-light_gray">
              중복 확인
            </button>
          </div>
        </div>
        <div>
          <p>휴대폰</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input className="h-11 w-full rounded-lg border border-light_gray px-4" />
            <button className="h-11 text-nowrap rounded-lg border border-light_gray px-[41.5px] text-center text-light_gray">
              중복 확인
            </button>
          </div>
        </div>
        <div>
          <p>계좌번호</p>
          <div className="relative flex flex-row">
            <input className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4" />
            <div className="absolute right-0 mt-2 flex flex-row items-center text-light_gray">
              <p>|</p>
              <button className="h-11 w-[118px]">은행 선택</button>
            </div>
          </div>
        </div>
        <button className="mt-8 h-[52px] w-full rounded-lg border border-stroke text-medium_gray">
          비밀번호 재설정
        </button>
      </div>
    </div>
  );
}
