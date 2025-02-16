import MainLayout from '@layout/mainLayout';
import { SpaceLatestResponse } from '@type/popUp/popUpResponse';
import { getAccessToken } from '@utils/token';
import { useHeaderStore } from '@zustands/header/headerStore';

import React, { useEffect, useState } from 'react';

import PopUpPage from '../popUp';
import ReservationPage from '../reservation';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { fetchSpaceLatest } from 'src/api/popUp';

export const getServerSideProps: GetServerSideProps<{
  spaceLatestData: SpaceLatestResponse;
}> = async () => {
  try {
    const spaceLatestData = await fetchSpaceLatest(); // 서버에서 데이터 요청
    return { props: { spaceLatestData } };
  } catch (error) {
    console.log('popUp error:', error);
    return { props: { spaceLatestData: {} as SpaceLatestResponse } };
  }
};

export default function MainPage({
  spaceLatestData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { mainPageType } = useHeaderStore();

  useEffect(() => {
    setIsLoggedIn(getAccessToken() ? true : false);
  }, []);

  return isLoggedIn ? (
    <MainLayout>
      {mainPageType === 'popUp' && <PopUpPage spaceLatestData={spaceLatestData} />}
      {mainPageType === 'reservation' && <ReservationPage />}
      {mainPageType === 'my' && <p>my</p>}
    </MainLayout>
  ) : (
    <p>login required</p>
  );
}
