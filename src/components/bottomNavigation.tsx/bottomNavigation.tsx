import My from '@assets/bottomNavigation/my.svg';
import Place from '@assets/bottomNavigation/place.svg';
import Recruit from '@assets/bottomNavigation/recruit.svg';

import React, { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

export default function BottomNavigationComponent({
  setPageType,
}: {
  setPageType: Dispatch<SetStateAction<'popUp' | 'recruit' | 'my'>>;
}) {
  return (
    <div className="fixed bottom-0 flex w-full max-w-[400px] flex-row justify-around border-t border-stroke py-2">
      <div onClick={() => setPageType('popUp')} className="flex flex-col items-center gap-2">
        <Image className="size-6" src={Place} alt="place-cion" />
        <p>팝업공간</p>
      </div>
      <div onClick={() => setPageType('recruit')} className="flex flex-col items-center gap-2">
        <Image className="size-6" src={Recruit} alt="recruit-icon" />
        <p>지원공고</p>
      </div>
      <div onClick={() => setPageType('my')} className="flex flex-col items-center gap-2">
        <Image className="size-6" src={My} alt="my-icon" />
        <p>나의정보</p>
      </div>
    </div>
  );
}
