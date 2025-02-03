import FilterComponent from '@components/popUp/filter';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';
import { useSpaceLatest } from '@hooks/usePopUp';

import React from 'react';

import { fetchSpaceLatest } from 'src/api/popUp';

const FilterType = ['지역', '가격', '수용인원', '인기순'];

export default function PopUpPage() {
  const { data, isLoading, error } = useSpaceLatest();

  return (
    <div>
      <Header />
      <p className="pb-2 pt-8 font-H2 text-H2 leading-H2">대여 가능한 팝업 공간</p>
      <div className="flex flex-row flex-wrap gap-[6px] py-4">
        {FilterType.map((filter) => (
          <FilterComponent filter={filter} />
        ))}
      </div>
      {isLoading && <p className="h-[500px] bg-pink-200">loading ...</p>}
      {error && <p>{error.message}</p>}
      {data && data.content.map((popUp) => <PopUpItem key={popUp.id} storeData={popUp} />)}
    </div>
  );
}
export async function getServerSideProps() {
  try {
    const initialData = await fetchSpaceLatest(); // 서버에서 데이터 요청
    return { props: { initialData } };
  } catch (error) {
    return { props: { initialData: [] } };
  }
}
