import ReservationItemComponent from '@components/reservation/reservationItem';
import { ReservationStatus } from '@type/reservation';

import React, { useState } from 'react';

import { reservationDummy } from './reservationDummy';

export default function ReservationPage() {
  const [reservationItem] = useState(reservationDummy);
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>('pending');
  return (
    <>
      {/* TODO: 클릭 된 아이템 표시 필요 */}
      <div className="fixed z-50 flex w-full max-w-[400px] -translate-x-5 flex-row justify-center bg-back_gray">
        <button
          onClick={() => setReservationStatus('pending')}
          className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1"
        >
          대기중
        </button>
        <button
          onClick={() => setReservationStatus('confirmed')}
          className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1"
        >
          예약 완료
        </button>
        <button
          onClick={() => setReservationStatus('cancled')}
          className="w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1"
        >
          예약 취소
        </button>
      </div>
      <div className="pt-[45px]">
        {reservationItem
          .filter((status) => status.status === reservationStatus)
          .map((item, index) => (
            <ReservationItemComponent key={index} reservationItem={item} status={item.status} />
          ))}
      </div>
    </>
  );
}
