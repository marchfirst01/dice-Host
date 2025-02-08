import MainFooterComponent from '@components/mainFooter/mainFooter';
import MainHeaderComponent from '@components/mainHeader/mainHeader';

import React, { Dispatch, SetStateAction } from 'react';

export default function MainLayout({
  children,
  pageType,
  setPageType,
}: {
  children: React.ReactNode;
  pageType: 'popUp' | 'reservation' | 'my';
  setPageType: Dispatch<SetStateAction<'popUp' | 'reservation' | 'my'>>;
}) {
  return (
    <div>
      <MainHeaderComponent />
      <div className="px-5 pb-[85px] pt-[57.25px]">{children}</div>
      <MainFooterComponent pageType={pageType} setPageType={setPageType} />
    </div>
  );
}
