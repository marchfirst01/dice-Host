import FilterComponent from '@components/popUp/filter';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';

import React, { useState } from 'react';

import { dummyData } from './dummy';

const FilterType = ['지역', '가격', '수용인원', '인기순'];

export default function PopUpPage() {
  const [popUpData] = useState(dummyData);
  return (
    <div className="relative">
      <Header />
      <p className="pb-2 pt-8 font-H2 text-H2 leading-H2">대여 가능한 팝업 공간</p>
      <div className="flex flex-row gap-[6px] py-4">
        {FilterType.map((filter) => (
          <FilterComponent filter={filter} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {popUpData.map((popUp) => (
          <PopUpItem storeData={popUp} />
        ))}
      </div>
    </div>
  );
}
