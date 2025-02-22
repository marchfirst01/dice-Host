import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpDetailLayout({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <nav className="fixed z-10 h-12 w-full max-w-[400px] bg-black">
        <Image
          onClick={() => router.back()}
          className="m-3 cursor-pointer"
          src={IMAGES.ArrowBackWhite}
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
        <button
          onClick={() => console.log('삭제')}
          className="h-full text-nowrap rounded-lg border border-stroke px-[35.5px] font-BTN1 text-BTN1 leading-BTN1"
        >
          삭제
        </button>
        <button
          onClick={() => router.push({ pathname: '/popUpSetting', query: { mode: 'edit', id } })}
          className="flex h-full w-full flex-row items-center justify-center gap-2 rounded-lg bg-black font-BTN1 text-BTN1 leading-BTN1 text-white"
        >
          <p>수정하기</p>
        </button>
      </nav>
    </div>
  );
}
