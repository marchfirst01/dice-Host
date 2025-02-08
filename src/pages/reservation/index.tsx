import ReservationItemComponent from '@components/reservation/reservationItem';

import React, { useState } from 'react';

import { reservationDummy } from './reservationDummy';

export default function ReservationPage() {
  const [reservationItem] = useState(reservationDummy);
  return (
    <div>
      <ReservationItemComponent
        reservationItem={reservationItem[0]}
        status={reservationItem[0].status}
      />
    </div>
  );
}
