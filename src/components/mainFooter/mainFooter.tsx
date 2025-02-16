import { IMAGES } from '@assets/index';
import { useHeaderStore } from '@zustands/header/headerStore';

import React, { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

export default function MainFooterComponent() {
  const { mainPageType, setMainPageType } = useHeaderStore();
  return (
    <div className="fixed bottom-0 flex w-full max-w-[400px] flex-row justify-around border-t border-stroke bg-white py-2">
      <div
        onClick={() => setMainPageType('popUp')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {mainPageType === 'popUp' ? (
          <Image className="size-6" src={IMAGES.PlaceBlack} alt="place-cion" />
        ) : (
          <Image className="size-6" src={IMAGES.PlaceGray} alt="place-cion" />
        )}
        <p>팝업공간</p>
      </div>
      <div
        onClick={() => setMainPageType('reservation')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {mainPageType === 'reservation' ? (
          <Image className="size-6" src={IMAGES.ReservationBlack} alt="reservation-icon" />
        ) : (
          <Image className="size-6" src={IMAGES.ReservationGray} alt="reservation-icon" />
        )}
        <p>예약관리</p>
      </div>
      <div
        onClick={() => setMainPageType('my')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {mainPageType === 'my' ? (
          <Image className="size-6" src={IMAGES.MyBlack} alt="my-icon" />
        ) : (
          <Image className="size-6" src={IMAGES.MyGray} alt="my-icon" />
        )}
        <p>나의정보</p>
      </div>
    </div>
  );
}
