import FooterComponent from '@components/common/footer';
import { useReservationStore } from '@zustands/reservation/reservationStore';

import React from 'react';

export default function ReservationLayoutComponent({ children }: { children: React.ReactNode }) {
  const { reservationStatus, setReservationStatus, pendingCount } = useReservationStore();
  return (
    <div className="pb-[73px] pt-[100px]">
      <header className="fixed top-0 z-[60] w-full max-w-[400px] bg-black px-5 pb-6 pt-8 text-white">
        <p className="text-style-H1">예약 관리</p>
      </header>
      <div className="fixed top-[84.8px] z-50 flex w-full max-w-[400px] flex-row justify-center bg-back_gray">
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
      {children}
      <FooterComponent pageType="reservation" />
    </div>
  );
}
