import { IMAGES } from '@assets/index';

import React, { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

export default function MainFooterComponent({
  pageType,
  setPageType,
}: {
  pageType: 'popUp' | 'reservation' | 'my';
  setPageType: Dispatch<SetStateAction<'popUp' | 'reservation' | 'my'>>;
}) {
  return (
    <div className="fixed bottom-0 flex w-full max-w-[400px] flex-row justify-around border-t border-stroke bg-white py-2">
      <div
        onClick={() => setPageType('popUp')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {pageType === 'popUp' ? (
          <Image className="size-6" src={IMAGES.PlaceBlack} alt="place-cion" />
        ) : (
          <Image className="size-6" src={IMAGES.PlaceGray} alt="place-cion" />
        )}
        <p>팝업공간</p>
      </div>
      <div
        onClick={() => setPageType('reservation')}
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
        onClick={() => setPageType('my')}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {pageType === 'my' ? (
          <Image className="size-6" src={IMAGES.MyBlack} alt="my-icon" />
        ) : (
          <Image className="size-6" src={IMAGES.MyGray} alt="my-icon" />
        )}
        <p>나의정보</p>
      </div>
    </div>
  );
}
