import { IMAGES } from '@assets/index';
import FooterComponent from '@components/common/footer';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HostLayoutComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const childrenArray = React.Children.toArray(children);
  return (
    <div className="h-full pb-[73px] pt-[68px]">
      <header className="fixed top-0 z-50 flex w-full max-w-[400px] flex-row justify-between px-5 pt-8">
        <p className="text-style-H1">호스트 정보</p>
        <Image
          onClick={() => router.push('/my/update')}
          className="cursor-pointer"
          src={IMAGES.EditGray}
          alt="edit-icon"
        />
      </header>
      {childrenArray.map((child, index) => {
        return (
          <div className="flex h-full flex-col" key={index}>
            <div className="px-5">{child}</div>
            {childrenArray && index < childrenArray.length - 1 && (
              <div className="my-5 h-2 w-full max-w-[400px] bg-back_gray"></div>
            )}
          </div>
        );
      })}
      <FooterComponent pageType="host" />
    </div>
  );
}
