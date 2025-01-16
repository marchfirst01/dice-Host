import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';

import React, { useState } from 'react';

import { dummyData } from './dummy';

export default function PopUpPage() {
  const [popupData] = useState(dummyData);
  return (
    <div className="relative">
      <Header />
      {/* 임시 전달 */}
      <PopUpItem storeData={popupData[0]} />
    </div>
  );
}
