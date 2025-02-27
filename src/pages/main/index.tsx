import { IMAGES } from '@assets/index';
import { useHostInfo, useHostSpace } from '@hooks/useHost';
import MainLayout from '@layout/mainLayout';
import { getAccessToken } from '@utils/token';
import { useHeaderStore } from '@zustands/header/headerStore';

import React, { useEffect, useState } from 'react';

import MyPage from '../my';
import PopUpPage from '../popUp';
import ReservationPage from '../reservation';
import Image from 'next/image';

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { mainPageType } = useHeaderStore();

  const { data: hostSpaceData, isFetching } = useHostSpace();
  const { data: hostInfo } = useHostInfo();

  console.log(hostSpaceData);
  useEffect(() => {
    setIsLoggedIn(getAccessToken() ? true : false);
  }, []);

  return isLoggedIn ? (
    <MainLayout>
      {isFetching ? (
        <div className="flex h-screen flex-row">
          <Image src={IMAGES.DiceLoading} alt="loading" />
        </div>
      ) : (
        (mainPageType === 'popUp' && <PopUpPage hostSpaceData={hostSpaceData} />) ||
        (mainPageType === 'reservation' && <ReservationPage />) ||
        (mainPageType === 'my' && <MyPage hostSpaceData={hostSpaceData} hostInfo={hostInfo} />)
      )}
    </MainLayout>
  ) : (
    <p>login required</p>
  );
}
