import ReservationItemComponent from '@components/reservation/reservationItem';
import { useReservationList } from '@hooks/useReservation';
import ReservationLayoutComponent from '@layout/reservationLayout';
import { Reservation } from '@type/reservation';
import { useReservationStore } from '@zustands/reservation/reservationStore';

import React, { useEffect, useState } from 'react';

export default function ReservationPage() {
  const { reservationStatus, setPendingCount } = useReservationStore();

  const [filterData, setFilterData] = useState<Reservation[] | undefined>([]);

  const { data, refetch } = useReservationList(reservationStatus);

  useEffect(() => {
    refetch();
    if (reservationStatus === 'PENDING') {
      setPendingCount(data ? data.content.filter((item) => item.status === 'PENDING').length : 0);
    }
    const filterData = data?.content.filter((status) => status.status === reservationStatus);
    setFilterData(filterData);
  }, [data, refetch, setPendingCount, reservationStatus]);

  return (
    <ReservationLayoutComponent>
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
