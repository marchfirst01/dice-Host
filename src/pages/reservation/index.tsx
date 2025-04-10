import ReservationItemComponent from '@components/reservation/reservationItem';
import { useReservationList } from '@hooks/useReservation';
import ReservationLayoutComponent from '@layout/reservationLayout';
import { Reservation, ReservationStatus } from '@type/reservation';

import React, { useEffect, useState } from 'react';

export default function ReservationPage() {
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>('PENDING');
  const [filterData, setFilterData] = useState<Reservation[] | undefined>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const { data, refetch } = useReservationList(reservationStatus);

  useEffect(() => {
    refetch();
    if (reservationStatus === 'PENDING') {
      setPendingCount(data ? data.content.filter((item) => item.status === 'PENDING').length : 0);
    }
    const filterData = data?.content.filter((status) => status.status === reservationStatus);
    setFilterData(filterData);
  }, [data, reservationStatus]);

  return (
    <ReservationLayoutComponent>
      {/* TODO: 클릭 된 아이템 표시 필요 */}
      <div className="fixed z-50 flex w-full max-w-[400px] flex-row justify-center bg-back_gray">
        <button
          onClick={() => setReservationStatus('PENDING')}
          className={`text-style-BTN1 w-[111.67px] py-3 ${reservationStatus === 'PENDING' && 'border-b-2 border-black'}`}
        >
          대기중
          <span className="ml-1 rounded-full bg-red px-2 py-[2px] text-white">{pendingCount}</span>
        </button>
        <button
          onClick={() => setReservationStatus('ACCEPT')}
          className={`text-style-BTN1 w-[111.67px] py-3 ${reservationStatus === 'ACCEPT' && 'border-b-2 border-black'}`}
        >
          예약 완료
        </button>
        <button
          onClick={() => setReservationStatus('DECLINE')}
          className={`text-style-BTN1 w-[111.67px] py-3 ${reservationStatus === 'DECLINE' && 'border-b-2 border-black'}`}
        >
          예약 취소
        </button>
      </div>
      <div className="px-5 pt-[45px]">
        {filterData && filterData.length > 0 ? (
          filterData.map((item, index) => (
            <ReservationItemComponent key={index} reservationItem={item} status={item.status} />
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
    </ReservationLayoutComponent>
  );
}
