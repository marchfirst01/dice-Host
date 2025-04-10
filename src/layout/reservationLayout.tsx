import FooterComponent from '@components/common/footer';

import React from 'react';

export default function ReservationLayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[73px]">
      <header className="bg-black px-5 pb-6 pt-8 text-white">
        <p className="text-style-H1">예약 관리</p>
      </header>
      {children}
      <FooterComponent pageType="reservation" />
    </div>
  );
}
