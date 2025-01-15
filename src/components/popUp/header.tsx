import HeaderBack from '@assets/popUp/headerBack.svg';

import React from 'react';

import PopUpSearch from './popUpSearch';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="relative w-full">
      {/* 이미지 사이즈 조절 필요 */}
      <Image src={HeaderBack} layout="intrinsic" alt="배경 이미지" />
      <div className="absolute top-[63px] w-full border-stroke px-5">
        <p className="font-H1 text-H1 text-white">팝업 공간과 지원공고를{<br />}쉽고 빠르게.</p>
        <PopUpSearch />
      </div>
    </div>
  );
}
