import { IMAGES } from '@assets/index';
import HostSpaceListComponent from '@components/host/hostSpaceList';
import { useHostInfo, useHostSpace } from '@hooks/useHost';
import HostLayoutComponent from '@layout/hostLayout';
import { deleteToken } from '@utils/token';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchLogout } from 'src/api/member';

export default function HostPage() {
  const router = useRouter();

  const { data: hostSpaceData } = useHostSpace();
  const { data: hostInfo } = useHostInfo();

  const handleLogout = async () => {
    const res = await fetchLogout();
    if (res === 200) {
      deleteToken();
      router.push('/');
    }
  };

  return (
    <HostLayoutComponent>
      <div className="my-6">
        <div className="flex flex-row items-center gap-3 pb-4">
          <Image src={IMAGES.DiceBlack} alt="profile" width={54} height={54} />
          <p className="text-style-SUB1">{hostInfo.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between pb-2">
          <p className="text-style-SUB3">
            등록한 공간 <span className="text-purple">{hostSpaceData.length}개</span>
          </p>
          <p
            onClick={() => router.push('/space')}
            className="text-style-CAP2 cursor-pointer text-medium_gray underline"
          >
            리스트 바로가기
          </p>
        </div>
        <HostSpaceListComponent hostSpaceList={hostSpaceData} />
      </div>
      <div className="text-style-SUB3 flex flex-col gap-6 py-6 text-deep_gray">
        <p onClick={() => router.push('/chat')} className="cursor-pointer">
          쪽지함
        </p>
        <hr />
        <p onClick={() => router.push('/')} className="cursor-pointer">
          회원 정보 관리
        </p>
        <p
          onClick={() =>
            window.open('https://juvenile-chess-b24.notion.site/18e7ece7ecb5800e99a0eedd7976c022')
          }
          className="cursor-pointer"
        >
          이용 약관
        </p>
        <p
          onClick={() =>
            window.open('https://juvenile-chess-b24.notion.site/18e7ece7ecb5806dab25c6fe7c424d7c')
          }
          className="cursor-pointer"
        >
          개인정보 처리방침
        </p>
        <hr />
        <p onClick={() => handleLogout()} className="cursor-pointer">
          로그아웃
        </p>
      </div>
      <p
        onClick={() => router.push({ pathname: '/host/withDraw', query: { name: hostInfo.name } })}
        className="text-style-SUB3 cursor-pointer py-6 text-deep_gray"
      >
        탈퇴하기
      </p>
    </HostLayoutComponent>
  );
}
