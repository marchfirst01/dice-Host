import { IMAGES } from '@assets/index';
import { useSearchStore } from '@zustands/popUp/searchStore';

import React from 'react';

import Image from 'next/image';

export default function SearchComponent() {
  const { setSearchText } = useSearchStore();
  return (
    <div className="relative h-[214px] w-full">
      <div className="absolute top-0 z-10 h-full w-screen max-w-[400px] bg-black opacity-40" />
      <div className="absolute aspect-[3/2] h-[214px] w-screen max-w-[400px]">
        <Image
          src={IMAGES.HeaderBack}
          fill
          priority
          style={{ objectFit: 'cover' }}
          alt="배경 이미지"
        />
      </div>
      <div className="absolute top-[63px] w-full border-stroke px-5">
        <div className="absolute z-20 w-full pr-10">
          <p className="mb-1 font-H1 text-H1 text-white">내가 등록한{<br />}공간 검색하기.</p>
          <div className="relative">
            <input
              className="h-[51px] w-full rounded-lg border px-[41px] text-medium_gray"
              placeholder="등록한 공간의 이름을 검색해보세요"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Image
              className="absolute left-[13px] top-1/2 -translate-y-1/2"
              src={IMAGES.Search}
              alt="검색 이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
