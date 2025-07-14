import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';

export default function ImageContainerComponent({
  index,
  url,
  onDelete,
  hasMain = true,
}: {
  index: number;
  url: string;
  onDelete: () => void;
  hasMain?: boolean;
}) {
  return (
    <div className="relative flex size-20 shrink-0 items-center justify-center rounded-xl border border-light_gray">
      <Image
        onClick={onDelete}
        className="absolute right-[-6px] top-[-6px] z-10 cursor-pointer"
        src={IMAGES.ImageDelete}
        alt="delete"
      />
      <Image
        className="rounded-xl"
        src={url}
        alt="header-back"
        fill
        style={{ objectFit: 'cover' }}
      />
      {index === 0 && hasMain && (
        <div className="text-style-CAP2 absolute bottom-0 z-10 w-full rounded-b-xl bg-[#00000080] py-[3px] text-center text-white">
          대표 이미지
        </div>
      )}
    </div>
  );
}
