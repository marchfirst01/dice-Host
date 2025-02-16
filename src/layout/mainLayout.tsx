import { IMAGES } from '@assets/index';
import MainFooterComponent from '@components/mainFooter/mainFooter';
import { useHeaderStore } from '@zustands/header/headerStore';

import React from 'react';

import Image from 'next/image';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { mainPageType } = useHeaderStore();
  return (
    <>
      <div
        className={`fixed top-0 z-10 flex w-full max-w-[400px] flex-row items-center justify-between px-5 py-4 ${mainPageType === 'my' ? 'bg-white' : 'bg-black'}`}
      >
        <p
          className={`font-SUB1 text-SUB1 leading-SUB1 ${mainPageType === 'my' ? 'text-black' : 'text-white'}`}
        >
          {mainPageType === 'popUp' && '등록한 팝업 공간'}
          {mainPageType === 'reservation' && '예약 관리'}
          {mainPageType === 'my' && '호스트 정보'}
        </p>
        {mainPageType === 'my' ? (
          <Image
            onClick={() => console.log('호스트 정보 수정')}
            className="cursor-pointer"
            src={IMAGES.EditGray}
            width={24}
            height={24}
            alt="쪽지 이미지"
          />
        ) : (
          <Image
            onClick={() => console.log('쪽지 페이지 이동')}
            className="cursor-pointer"
            src={IMAGES.SendGray}
            width={24}
            height={24}
            alt="쪽지 이미지"
          />
        )}
      </div>
      {mainPageType === 'my' ? (
        <div className="pb-[85px] pt-[60px]">{children}</div>
      ) : (
        <div className="px-5 pb-[85px] pt-[60px]">{children}</div>
      )}
      <MainFooterComponent />
    </>
  );
}
