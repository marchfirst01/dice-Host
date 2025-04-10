import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function FooterComponent({ pageType }: { pageType: string }) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 z-50 flex w-full max-w-[400px] flex-row justify-around border-t border-stroke bg-white py-2">
      <div
        onClick={() => router.push('/space')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {pageType === 'space' ? (
          <Image className="size-6" src={IMAGES.PlaceBlack} alt="place-cion" />
        ) : (
          <Image className="size-6" src={IMAGES.PlaceGray} alt="place-cion" />
        )}
        <p>팝업공간</p>
      </div>
      <div
        onClick={() => router.push('/reservation')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {pageType === 'reservation' ? (
          <Image className="size-6" src={IMAGES.ReservationBlack} alt="reservation-icon" />
        ) : (
          <Image className="size-6" src={IMAGES.ReservationGray} alt="reservation-icon" />
        )}
        <p>예약관리</p>
      </div>
      <div
        onClick={() => router.push('/host')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {pageType === 'host' ? (
          <Image className="size-6" src={IMAGES.MyBlack} alt="my-icon" />
        ) : (
          <Image className="size-6" src={IMAGES.MyGray} alt="my-icon" />
        )}
        <p>나의정보</p>
      </div>
    </div>
  );
}
