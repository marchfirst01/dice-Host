import BottomNavigationComponent from '@components/bottomNavigation.tsx/bottomNavigation';
import TopNavigation from '@components/topNavigation/topNavigation';

import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <TopNavigation />
      <div className="px-5">{children}</div>
      <BottomNavigationComponent />
    </div>
  );
}
