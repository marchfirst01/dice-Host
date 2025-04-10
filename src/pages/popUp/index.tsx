import { IMAGES } from '@assets/index';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';
import { HostSpaceData } from '@type/my';
import { useSearchStore } from '@zustands/popUp/searchStore';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpPage({ hostSpaceData }: { hostSpaceData: HostSpaceData[] }) {
  const router = useRouter();

  const { searchText } = useSearchStore();
  let filteredHostSpaceData: HostSpaceData[] = [];
  if (hostSpaceData) {
    filteredHostSpaceData = hostSpaceData.filter((space) =>
      space.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  return (
    hostSpaceData && (
      <div className="size-full">
        <Header />
        <div className="flex flex-row flex-wrap gap-[6px] py-4"></div>
        <div className="flex flex-col gap-4">
          {filteredHostSpaceData.length > 0 ? (
            filteredHostSpaceData.map((space) => <PopUpItem key={space.id} storeData={space} />)
          ) : (
            <p className="text-style-SUB1">
              아직 등록한 공간이 없어요!
              <br />
              자신만의 공간을 추가해봐요
            </p>
          )}
        </div>
        <div
          onClick={() => router.push({ pathname: '/popUpSetting', query: { mode: 'register' } })}
          className="fixed bottom-20 left-1/2 z-20 translate-x-[115px] cursor-pointer"
        >
          <Image src={IMAGES.FloatingAddButton} alt="floatingAddBtn" />
        </div>
      </div>
    )
  );
}
