import ArrowBack from '@assets/topNavigation/arrow-back.svg';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

const NewPopUpLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const childrenArray = React.Children.toArray(children);

  return (
    <div>
      <nav className="fixed z-10 h-12 w-full max-w-[400px] bg-black">
        <Image
          onClick={() => router.back()}
          className="m-3 cursor-pointer"
          src={ArrowBack}
          alt="arrow-back"
          width={24}
          height={24}
        />
      </nav>
      <div className="pb-[119px] pt-[72px]">
        {childrenArray.map((child, index) => (
          <div className="flex flex-col" key={index}>
            <div className="px-5">{child}</div>
            {index < childrenArray.length - 1 && <div className="my-5 h-2 bg-gray-200"></div>}
          </div>
        ))}
      </div>
      <nav className="fixed bottom-0 z-10 flex h-[84px] w-full max-w-[400px] flex-row items-center gap-3 border-t border-stroke bg-white px-5 py-4">
        <button
          onClick={() => console.log('작성 완료')}
          className="flex h-full w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg bg-black text-white"
        >
          <p>작성 완료</p>
        </button>
      </nav>
    </div>
  );
};

export default NewPopUpLayout;
