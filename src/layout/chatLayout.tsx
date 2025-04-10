import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="h-screen bg-back_gray pt-12">
      <header className="fixed top-0 flex h-12 w-full max-w-[400px] flex-row items-center bg-white px-1">
        <Image
          onClick={() => router.back()}
          className="cursor-pointer"
          src={IMAGES.ArrowBackBlack}
          alt="back"
        />
        <p className="text-style-SUB2 grow text-center">{name}</p>
        <Image src={IMAGES.ReportGray} alt="report" />
      </header>
      <div className="text-style-CAP1 mx-5 my-6 rounded-lg bg-white p-4 text-deep_gray">
        ‘{name}’ 담당자님과의 쪽지가 시작되었습니다. 불필요한 비방과 부적절한 언행은 제재 대상이 될
        수 있습니다.
      </div>
      <section className="px-5 pb-[68px]">{children}</section>
    </div>
  );
}
