import { IMAGES } from '@assets/index';
import PopUpItem from '@components/popUp/popUpItem';
import { useHostSpace } from '@hooks/useHost';
import SpaceLayout from '@layout/spaceLayout';
import { HostSpaceData } from '@type/my';
import { useSearchStore } from '@zustands/popUp/searchStore';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SpacePage() {
  const router = useRouter();

  const { data: hostSpaceData, isFetching } = useHostSpace();

  const { searchText } = useSearchStore();
  let filteredHostSpaceData: HostSpaceData[] = [];
  if (hostSpaceData) {
    filteredHostSpaceData = hostSpaceData.filter((space) =>
      space.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Image src={IMAGES.DiceLoading} priority alt="loading" width={150} height={150} />
      </div>
    );
  }

  return (
    <SpaceLayout>
      {/* TODO: 드롭다운 추가하기 */}
      <button className="text-style-BTN1 my-4 flex flex-row items-center gap-0.5 rounded-full bg-back_gray py-[5.5px] pl-3 pr-2 text-deep_gray">
        최신순
        <Image src={IMAGES.ArrowDownGray} alt="arrow" />
      </button>
      {hostSpaceData && (
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
      )}
      <div
        onClick={() => router.push({ pathname: '/popUpSetting', query: { mode: 'register' } })}
        className="fixed bottom-20 left-1/2 z-20 translate-x-[115px] cursor-pointer"
      >
        <Image src={IMAGES.FloatingAddButton} alt="floatingAddBtn" />
      </div>
    </SpaceLayout>
  );
}
