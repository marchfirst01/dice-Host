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
    <div className="">
      <TopNavigation />
      <div className="px-5">{children}</div>
      <BottomNavigationComponent setPageType={setPageType} />
    </div>
  );
}
