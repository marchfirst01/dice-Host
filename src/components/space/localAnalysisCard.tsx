import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';

export default function LocalAnalysisCard() {
  return (
    <div className="flex h-[108px] w-full flex-row items-center rounded-lg border border-stroke">
      <div className="ml-4 w-full">
        <p className="text-style-BTN1 mb-1">성수2가1동 유동인구 핵심 분석</p>
        <p className="text-style-SUB2 text-purple">전국 20대 여성 유동인구 상위 5%</p>
        <p className="text-style-BODY1 text-deep_gray">주로 사진 촬영 목적 방문이 많아요</p>
      </div>
      <div className="flex h-full w-12 cursor-pointer items-center justify-center bg-back_gray">
        <Image className="-rotate-90" src={IMAGES.ArrowDownGray} alt="arrow" />
      </div>
    </div>
  );
}
