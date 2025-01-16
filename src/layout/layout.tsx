import BottomNavigationComponent from '@components/bottomNavigation.tsx/bottomNavigation';
import TopNavigation from '@components/topNavigation/topNavigation';

import React, { Dispatch, SetStateAction } from 'react';

export default function MainLayout({
  children,
  setPageType,
}: {
  children: React.ReactNode;
  setPageType: Dispatch<SetStateAction<'popUp' | 'recruit' | 'my'>>;
}) {
  return (
    <div>
      <TopNavigation />
      <div className="px-5 pb-[85px] pt-[57.25px]">{children}</div>
      <BottomNavigationComponent setPageType={setPageType} />
    </div>
  );
}
