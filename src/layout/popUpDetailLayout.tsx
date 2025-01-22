import Phone from '@assets/popUpDetail/phone.svg';
import Send from '@assets/popUpDetail/send.svg';
import ArrowBack from '@assets/topNavigation/arrow-back.svg';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpDetailLayout({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const router = useRouter();

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
      <div className="pb-[84px] pt-12">
        {childrenArray.map((child, index) => {
          return index === 0 ? (
            <div key={index} className="w-full">
              {child}
            </div>
          ) : (
            <div className="flex flex-col" key={index}>
              <div className="px-5">{child}</div>
              {index < childrenArray.length - 1 && index !== 0 && (
                <div className="my-5 h-2 bg-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>
      <nav className="fixed bottom-0 z-10 flex h-[84px] w-full max-w-[400px] flex-row items-center gap-3 border-t border-stroke bg-white px-5 py-4">
        <div
          onClick={() => console.log('전화 걸기')}
          className="size-[52px] cursor-pointer rounded-lg border border-stroke p-[14px]"
        >
          <Image className="size-6" src={Phone} alt="phone" width={24} height={24} />
        </div>
        <button
          onClick={() => console.log('쪽지 보내기')}
          className="flex h-full w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg bg-black text-white"
        >
          <Image src={Send} alt="send" />
          <p>쪽지 보내기</p>
        </button>
      </nav>
    </div>
  );
}
