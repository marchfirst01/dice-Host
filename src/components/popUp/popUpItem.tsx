import { IMAGES } from '@assets/index';
import { HostSpaceData } from '@type/my';
import formatDiscountPrice from '@utils/formatDiscountPrice';
import { formatNumber } from '@utils/formatNumber';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpItem({
  storeData,
}: {
  storeData: HostSpaceData;
}): React.ReactElement<HostSpaceData> {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/popUp/${storeData.id}`)}
      className="relative aspect-[3/2] w-full cursor-pointer rounded-lg border border-stroke"
    >
      <div
        className={`${!storeData.isActivated && 'absolute z-10 size-full rounded-lg bg-dark_gray/50'}`}
      />
      <div className="relative h-[180px]">
        <Image
          className="aspect-[3/2] rounded-t-lg"
          src={storeData.imageUrl}
          alt={storeData.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative flex flex-col px-4 pb-4 pt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
              {storeData.city} · {storeData.district}
            </p>
            <p className="font-SUB2 text-SUB2 leading-SUB2">{storeData.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={IMAGES.HeartFull} alt="heart" />
            <p className="font-CAP2 text-CAP2 leading-CAP2 text-purple">{storeData.likeCount}</p>
          </div>
        </div>
        <p className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
          {storeData.size}m² · {storeData.capacity}명 수용가능
        </p>
        <div className="flex flex-col items-end">
          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-dark_gray">1일 대여</p>
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray line-through">
              {formatNumber(storeData.pricePerDay)}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[6px]">
            <p className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
              {storeData.discountRate}%
            </p>
            {/* 추후 숫자 포맷 함수 추가 필요 */}
            <p className="font-SUB1 text-SUB1 leading-SUB1">
              {formatNumber(
                formatDiscountPrice({
                  price: storeData.pricePerDay,
                  discount: storeData.discountRate,
                }),
              )}
              원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
