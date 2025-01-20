import Delete from '@assets/newPopUp/image-delete.svg';
import HeaderBack from '@assets/popUp/headerBack.svg';

import React from 'react';

import Image from 'next/image';

export default function ImageContainerComponent() {
  return (
    <div className="relative flex size-20 flex-shrink-0 items-center justify-center rounded-xl border border-light_gray">
      <Image
        className="absolute -right-[6px] -top-[6px] z-50 cursor-pointer"
        src={Delete}
        alt="delete"
      />
      {/* 임시 이미지 */}
      <Image
        className="rounded-xl"
        src={HeaderBack}
        alt="header-back"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
