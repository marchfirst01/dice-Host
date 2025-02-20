import { IMAGES } from '@assets/index';
import { StoreData } from '@type/popUp';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpItem({
  storeData,
}: {
  storeData: StoreData;
}): React.ReactElement<StoreData> {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/popUp/${storeData.id}`)}
      className="aspect-[3/2] w-full cursor-pointer rounded-lg border border-stroke"
    >
      <div className="relative h-[180px]">
        <Image
          className="aspect-[3/2] rounded-t-lg"
          // TODO: 'www.example.com' 삭제필요
          src={
            storeData.imageUrl === 'www.example.com'
              ? 'https://placehold.co/600x400/png'
              : storeData.imageUrl
          }
          alt={storeData.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative flex flex-col px-4 pb-4 pt-2">
        <div className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
          {/* {storeData.cityName} · {storeData.neighborhoodName} */}
          {storeData.address}
        </div>
        <div className="font-SUB2 text-SUB2 leading-SUB2">{storeData.name}</div>
        <div className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
          m² · {storeData.capacity}명 수용가능
        </div>
        <p className="mt-4 font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</p>
        <div className="flex flex-row items-center gap-[6px]">
          <p className="font-SUB2 text-SUB2 leading-SUB2 text-purple">{storeData.discountRate}%</p>
          {/* 추후 숫자 포맷 함수 추가 필요 */}
          <p className="font-SUB1 text-SUB1 leading-SUB1">{storeData.pricePerDay}원</p>
        </div>
        <Image className="absolute right-0 top-[17px] m-6" src={IMAGES.Heart} alt="heart" />
      </div>
    </div>
  );
}
