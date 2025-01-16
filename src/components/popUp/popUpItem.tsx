import Heart from '@assets/topNavigation/heart.svg';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface CardComponentProps {
  storeData: {
    id: number;
    thumbnail: string;
    cityName: string;
    neighborhoodName: string;
    name: string;
    area: number;
    numOfPeople: number;
    date: number;
    price: number;
    isLiked: boolean;
  };
}

export default function PopUpItem({
  storeData,
}: CardComponentProps): React.ReactElement<CardComponentProps> {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/popUp/${storeData.id}`)}
      className="aspect-[3/2] w-full cursor-pointer rounded-lg border border-stroke"
    >
      <div className="relative h-[180px]">
        <Image
          className="aspect-[3/2] rounded-t-lg"
          src={storeData.thumbnail}
          alt={storeData.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative flex flex-col px-4 pb-4 pt-2">
        <div className="text-CAP1 text-medium_gray">
          {storeData.cityName} · {storeData.neighborhoodName}
        </div>
        <div className="text-SUB2">{storeData.name}</div>
        <div className="text-CAP1 text-medium_gray">
          {storeData.area}m² · {storeData.numOfPeople}명 수용가능
        </div>
        <div className="mt-4 flex flex-row items-center gap-[6px]">
          <p className="text-SUB2">{storeData.date}일 대여</p>
          {/* 추후 숫자 포맷 함수 추가 필요 */}
          <p className="text-SUB1 text-purple">{storeData.price}원</p>
        </div>
        <Image className="absolute right-0 top-[17px] m-6" src={Heart} alt="heart" />
      </div>
    </div>
  );
}
