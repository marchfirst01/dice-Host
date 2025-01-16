import LogoWhite from '@assets/home/logo-white.svg';
import Chat from '@assets/topNavigation/chat.svg';
import Heart from '@assets/topNavigation/heart.svg';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TopNavigation() {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-10 flex w-full max-w-[400px] flex-row items-center justify-between bg-black px-5 py-4">
      <Image
        onClick={() => router.push('/')}
        className="cursor-pointer"
        src={LogoWhite}
        alt="로고이미지"
        width={70}
        height={25}
      />
      <div className="flex flex-row gap-6">
        <Image
          onClick={() => console.log('좋아요 페이지 이동')}
          className="cursor-pointer"
          src={Heart}
          width={24}
          height={24}
          alt="좋아요 이미지"
        />
        <Image
          onClick={() => console.log('쪽지 페이지 이동')}
          className="cursor-pointer"
          src={Chat}
          width={24}
          height={24}
          alt="쪽지 이미지"
        />
      </div>
    </div>
  );
}
