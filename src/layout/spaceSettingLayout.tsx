import { IMAGES } from '@assets/index';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import OnOffButtonComponent from '@components/space/setting/onOffButton';
import { SpaceFormData } from '@type/space/spaceType';

import React, { Dispatch, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface SpaceSettingLayerProps {
  children: React.ReactNode;
  handleSubmit: (
    onSubmit: SubmitHandler<SpaceFormData>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<SpaceFormData>;
  isOn: boolean;
  setIsOn: Dispatch<boolean>;
}

export default function SpaceSettingLayout({
  children,
  handleSubmit,
  onSubmit,
  isOn,
  setIsOn,
}: SpaceSettingLayerProps) {
  const router = useRouter();

  const childrenArray = React.Children.toArray(children);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 110) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="fixed z-50 flex h-[48px] w-full max-w-[400px] flex-row items-center bg-black">
        <div className="relative flex h-[48px] w-full items-center justify-center">
          <Image
            onClick={() => router.back()}
            className="absolute left-0 top-0 m-3 cursor-pointer"
            src={IMAGES.ArrowBackWhite}
            alt="arrow-back"
            width={24}
            height={24}
          />
          {isScrolled && (
            <div className="flex w-full flex-row items-center justify-between pl-[51px] pr-5">
              <p className="text-style-BODY1 text-white">팝업 공간 등록 관리자 페이지</p>
              <OnOffButtonComponent isOn={isOn} setIsOn={setIsOn} />
            </div>
          )}
        </div>
      </header>
      <div className="mb-5 flex flex-row items-center justify-between bg-black px-5 pt-[48px]">
        <p className="text-style-H1 pb-6 pt-8 text-white">
          팝업 공간 등록
          <br />
          관리자 페이지
        </p>
        <OnOffButtonComponent isOn={isOn} setIsOn={setIsOn} />
      </div>
      <div className="pb-[119px]">
        {childrenArray.map((child, index) => (
          <div className="flex flex-col" key={index}>
            <div className="px-5">{child}</div>
            {childrenArray && index < childrenArray.length - 1 && (
              <div className="my-5 h-2 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
      <footer className="fixed bottom-0 z-10 flex h-[84px] w-full max-w-[400px] flex-row items-center gap-3 border-t border-stroke bg-white px-5 py-4">
        <RegisterFormButtonComponent<SpaceFormData> handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <p>작성 완료</p>
        </RegisterFormButtonComponent>
      </footer>
    </div>
  );
}
