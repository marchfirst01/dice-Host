import { IMAGES } from '@assets/index';
import FooterComponent from '@components/common/footer';
import SearchComponent from '@components/space/search';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SpaceListLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="h-full pb-[73px] pt-[60px]">
      <header className="fixed top-0 z-50 flex w-full max-w-[400px] flex-row items-center justify-between bg-black px-5 py-4">
        <p className="text-style-SUB1 text-white">등록한 팝업 공간</p>
        <Image
          onClick={() => router.push('/chat')}
          className="cursor-pointer"
          src={IMAGES.SendGray}
          width={24}
          height={24}
          alt="쪽지 이미지"
        />
      </header>
      <SearchComponent />
      <div className="px-5">{children}</div>
      <FooterComponent pageType="space" />
    </div>
  );
}
