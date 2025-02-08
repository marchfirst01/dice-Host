import ReservationItemComponent from '@components/reservation/reservationItem';

import React, { useState } from 'react';

import { reservationDummy } from './reservationDummy';

export default function ReservationPage() {
  const [reservationItem] = useState(reservationDummy);
  return (
    <>
      <div className="fixed z-50 flex w-full max-w-[400px] -translate-x-5 flex-row justify-center bg-back_gray">
        <button className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1">대기중</button>
        <button className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1">예약 완료</button>
        <button className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1">예약 취소</button>
      </div>
      <div className="pt-[45px]">
        <ReservationItemComponent
          reservationItem={reservationItem[0]}
          status={reservationItem[0].status}
        />
        <ReservationItemComponent
          reservationItem={reservationItem[0]}
          status={reservationItem[0].status}
        />
        <ReservationItemComponent
          reservationItem={reservationItem[0]}
          status={reservationItem[0].status}
        />
        <ReservationItemComponent
          reservationItem={reservationItem[0]}
          status={reservationItem[0].status}
        />
        <ReservationItemComponent
          reservationItem={reservationItem[0]}
          status={reservationItem[0].status}
        />
      </div>
    </>
  );
}
