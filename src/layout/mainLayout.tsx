import MainFooterComponent from '@components/mainFooter/mainFooter';
import MainHeaderComponent from '@components/mainHeader/mainHeader';

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
      <MainHeaderComponent />
      <div className="px-5 pb-[85px] pt-[57.25px]">{children}</div>
      <MainFooterComponent setPageType={setPageType} />
    </div>
  );
}
