import FilterComponent from '@components/popUp/filter';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';

import React from 'react';

import { getServerSideProps } from '../main';
import { InferGetServerSidePropsType } from 'next';

const FilterType = ['지역', '가격', '수용인원', '인기순'];

export default function PopUpPage({
  spaceLatestData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(spaceLatestData);
  return (
    <div>
      <Header />
      <p className="pb-2 pt-8 font-H2 text-H2 leading-H2">대여 가능한 팝업 공간</p>
      <div className="flex flex-row flex-wrap gap-[6px] py-4">
        {FilterType.map((filter, index) => (
          <FilterComponent key={index} filter={filter} />
        ))}
      </div>
      {spaceLatestData &&
        spaceLatestData.content.map((popUp) => <PopUpItem key={popUp.id} storeData={popUp} />)}
    </div>
  );
}
