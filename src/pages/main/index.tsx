import MainLayout from '@layout/layout';

import React, { useState } from 'react';

import PopUpPage from '../popUp';

export default function MainPage() {
  const [pageType, setPageType] = useState<'popUp' | 'recruit'>('popUp');
  return <MainLayout>{pageType === 'popUp' && <PopUpPage />}</MainLayout>;
}
