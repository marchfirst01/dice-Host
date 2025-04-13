import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SpaceViewLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { id } = router.query;

  const childrenArray = React.Children.toArray(children);
  return (
    <div>
      <header className="fixed z-10 h-12 w-full max-w-[400px] bg-black">
        <Image
          onClick={() => router.back()}
          className="m-3 cursor-pointer"
          src={IMAGES.ArrowBackWhite}
          alt="back-icon"
        />
      </header>
      <main className="pb-[84px] pt-12">
        {childrenArray.map((child, index) => {
          return index === 0 ? (
            <section key={index} className="w-full">
              {child}
            </section>
          ) : (
            <section key={index} className="flex flex-col">
              <div className="px-5">{child}</div>
              {childrenArray && index < childrenArray.length - 1 && index !== 0 && (
                <div className="my-5 h-2 bg-gray-200" />
              )}
            </section>
          );
        })}
      </main>
      <footer className="fixed bottom-0 z-[100] flex h-[84px] w-full max-w-[400px] flex-row items-center gap-3 border-t border-stroke bg-white px-5 py-4">
        <button
          onClick={() => console.log('삭제')}
          className="text-style-BTN1 h-full text-nowrap rounded-lg border border-stroke px-[35.5px]"
        >
          삭제
        </button>
        <button
          onClick={() => router.push({ pathname: `/popUpSetting/${id}`, query: { mode: 'edit' } })}
          className="text-style-BTN1 flex size-full flex-row items-center justify-center gap-2 rounded-lg bg-black text-white"
        >
          <p>수정하기</p>
        </button>
      </footer>
    </div>
  );
}
