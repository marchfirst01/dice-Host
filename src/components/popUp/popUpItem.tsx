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
        className={`${!storeData.isActivated && 'absolute z-10 size-full rounded-lg bg-dark_gray/30'}`}
      ></div>
      <div className="relative h-[180px]">
        {!storeData.isActivated && (
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-black/50 px-4 py-3">
            <p className="text-style-SUB2 text-white">비공개 상태</p>
            <p className="text-style-BODY2 text-stroke">게스트에게 노출되지 않음</p>
          </div>
        )}
        <Image
          className={`aspect-[3/2] rounded-t-lg ${!storeData.isActivated && 'saturate-0'}`}
          src={storeData.imageUrl}
          alt={storeData.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="relative flex flex-col px-4 pb-4 pt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-style-CAP1 text-medium_gray">
              {storeData.city} · {storeData.district}
            </p>
            <p className={`text-style-SUB2 ${!storeData.isActivated && 'text-deep_gray'}`}>
              {storeData.name}
            </p>
          </div>
          <div className="flex flex-col items-center">
            {!storeData.isActivated ? (
              <Image src={IMAGES.HeartDisabled} alt="heart" />
            ) : (
              <Image src={IMAGES.HeartFull} alt="heart" />
            )}
            <p
              className={`text-style-CAP2 ${!storeData.isActivated ? 'text-light_gray' : 'text-purple'}`}
            >
              {storeData.likeCount}
            </p>
          </div>
        </div>
        <p
          className={`text-style-CAP1 ${!storeData.isActivated ? 'text-light_gray' : 'text-medium_gray'}`}
        >
          {storeData.size}m² · {storeData.capacity}명 수용가능
        </p>
        <div className="flex flex-col items-end">
          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="text-style-CAP1 text-dark_gray">1일 대여</p>
            <p className="text-style-CAP1 text-light_gray line-through">
              {formatNumber(storeData.pricePerDay)}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[6px]">
            <p
              className={`text-style-SUB2 ${!storeData.isActivated ? 'text-medium_gray' : 'text-purple'}`}
            >
              {storeData.discountRate}%
            </p>
            {/* 추후 숫자 포맷 함수 추가 필요 */}
            <p className={`text-style-SUB1 ${!storeData.isActivated && 'text-deep_gray'}`}>
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
