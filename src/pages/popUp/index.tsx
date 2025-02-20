import { IMAGES } from '@assets/index';
import Header from '@components/popUp/header';
import PopUpItem from '@components/popUp/popUpItem';
import { HostSpaceData } from '@type/my';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpPage({ hostSpaceData }: { hostSpaceData: HostSpaceData[] }) {
  const router = useRouter();
  return (
    <div className="h-full w-full transform">
      <Header />
      <div className="flex flex-row flex-wrap gap-[6px] py-4"></div>
      <div className="flex flex-col gap-4">
        {hostSpaceData.length > 0 ? (
          hostSpaceData.map((space) => <PopUpItem key={space.id} storeData={space} />)
        ) : (
          <p className="font-SUB1 text-SUB1 leading-SUB1">
            아직 등록한 공간이 없어요!
            <br />
            자신만의 공간을 추가해봐요
          </p>
        )}
      </div>
      <div
        onClick={() => router.push('/popUpSetting')}
        className="fixed bottom-0 right-0 cursor-pointer"
      >
        <Image src={IMAGES.FloatingAddButton} alt="floatingAddBtn" />
      </div>
    </div>
  );
}
