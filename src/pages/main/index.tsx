import MainLayout from '@layout/layout';

import React, { useState } from 'react';

import PopUpPage from '../popUp';

export default function MainPage() {
  const [pageType, setPageType] = useState<'popUp' | 'recruit' | 'my'>('popUp');

  return (
    <MainLayout setPageType={setPageType}>
      {pageType === 'popUp' && <PopUpPage />}
      {pageType === 'recruit' && <p>recruit</p>}
      {pageType === 'my' && <p>my</p>}
    </MainLayout>
  );
}
