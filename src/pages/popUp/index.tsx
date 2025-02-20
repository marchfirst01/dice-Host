import FilterComponent from '@components/popUp/filter';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';
import { HostSpaceData } from '@type/my';

import React from 'react';

const FilterType = ['지역', '가격', '수용인원', '인기순'];

export default function PopUpPage({ hostSpaceData }: { hostSpaceData: HostSpaceData[] }) {
  return (
    <>
      <Header />
      <p className="pb-2 pt-8 font-H2 text-H2 leading-H2">대여 가능한 팝업 공간</p>
      <div className="flex flex-row flex-wrap gap-[6px] py-4">
        {FilterType.map((filter, index) => (
          <FilterComponent key={index} filter={filter} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {hostSpaceData &&
          hostSpaceData.map((space) => <PopUpItem key={space.id} storeData={space} />)}
      </div>
    </>
  );
}
