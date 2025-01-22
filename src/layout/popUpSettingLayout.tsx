import { IMAGES } from '@assets/index';
import { PopUpFormData } from '@type/popUpSetting';

import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface PopUpSettingLayoutProps {
  children: React.ReactNode;
  handleSubmit: (
    onSubmit: SubmitHandler<PopUpFormData>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<PopUpFormData>;
}

export default function PopUpSettingLayout({
  children,
  handleSubmit,
  onSubmit,
}: PopUpSettingLayoutProps) {
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
    <div className="relative">
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
            <p className="mx-auto font-BODY1 text-BODY1 leading-BODY1 text-white">
              팝업 공간 등록 관리자 페이지
            </p>
          )}
        </div>
      </header>
      <div className="mb-5 bg-black pt-[48px]">
        <p className="px-5 pb-6 pt-8 font-H1 text-H1 leading-H1 text-white">
          팝업 공간 등록
          <br />
          관리자 페이지
        </p>
      </div>
      <div className="pb-[119px]">
        {childrenArray.map((child, index) => (
          <div className="flex flex-col" key={index}>
            <div className="px-5">{child}</div>
            {index < childrenArray.length - 1 && <div className="my-5 h-2 bg-gray-200"></div>}
          </div>
        ))}
      </div>
      <footer className="fixed bottom-0 z-10 flex h-[84px] w-full max-w-[400px] flex-row items-center gap-3 border-t border-stroke bg-white px-5 py-4">
        <button
          onClick={handleSubmit(onSubmit)}
          className="flex h-full w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg bg-black text-white"
        >
          <p>작성 완료</p>
        </button>
      </footer>
    </div>
  );
}
