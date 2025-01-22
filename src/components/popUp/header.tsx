import { IMAGES } from '@assets/index';

import React from 'react';

import PopUpSearch from './popUpSearch';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="relative h-[214px] w-full">
      <div className="absolute -left-5 aspect-[3/2] h-[214px] w-screen max-w-[400px]">
        <Image src={IMAGES.HeaderBack} layout="fill" objectFit="cover" alt="배경 이미지" />
      </div>
      <div className="absolute top-[63px] w-full border-stroke px-5">
        <p className="font-H1 text-H1 text-white">팝업 공간과 지원공고를{<br />}쉽고 빠르게.</p>
        <PopUpSearch />
      </div>
    </div>
  );
}
