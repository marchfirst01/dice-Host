import Search from '@assets/popUp/search.svg';

import React from 'react';

import Image from 'next/image';

export default function PopUpSearch() {
  return (
    <div className="relative">
      <input
        className="h-[51px] w-full rounded-lg border px-[41px] text-medium_gray"
        placeholder="원하시는 팝업 위치를 검색해보세요"
      />
      <Image
        className="absolute left-[13px] top-1/2 -translate-y-1/2"
        src={Search}
        alt="검색 이미지"
      />
    </div>
  );
}
