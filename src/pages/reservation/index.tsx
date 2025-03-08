import ReservationItemComponent from '@components/reservation/reservationItem';
import { useReservationList } from '@hooks/useReservation';
import { Reservation, ReservationStatus } from '@type/reservation';

import React, { useEffect, useState } from 'react';

export default function ReservationPage() {
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>('PENDING');
  const [filterData, setFilterData] = useState<Reservation[] | undefined>([]);

  const { data } = useReservationList(reservationStatus);
  console.log(data);
  const pendingCount = data?.content.filter((item) => item.status === 'PENDING').length;

  useEffect(() => {
    const filterData = data?.content.filter((status) => status.status === reservationStatus);
    setFilterData(filterData);
  }, [data, reservationStatus]);

  return (
    <>
      {/* TODO: 클릭 된 아이템 표시 필요 */}
      <div className="fixed z-50 flex w-full max-w-[400px] -translate-x-5 flex-row justify-center bg-back_gray">
        <button
          onClick={() => setReservationStatus('PENDING')}
          className={`w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1 ${reservationStatus === 'PENDING' && 'border-b-2 border-black'}`}
        >
          대기중
          <span className="ml-1 rounded-full bg-red px-2 py-[2px] text-white">{pendingCount}</span>
        </button>
        <button
          onClick={() => setReservationStatus('ACCEPT')}
          className={`w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1 ${reservationStatus === 'ACCEPT' && 'border-b-2 border-black'}`}
        >
          예약 완료
        </button>
        <button
          onClick={() => setReservationStatus('CANCEL')}
          className={`w-[111.67px] py-3 font-BTN1 text-BTN1 leading-BTN1 ${reservationStatus === 'CANCEL' && 'border-b-2 border-black'}`}
        >
          예약 취소
        </button>
      </div>
      <div className="pt-[45px]">
        {filterData && filterData.length > 0 ? (
          filterData.map((item, index) => (
            <ReservationItemComponent key={index} reservationItem={item} status={item.status} />
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
    </>
  );
}
