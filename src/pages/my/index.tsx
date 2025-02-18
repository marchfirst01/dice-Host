import { IMAGES } from '@assets/index';
import MySpaceListComponent from '@components/my/mySpaceList';
import MyLayout from '@layout/myLayout';
import { HostSpaceData } from '@type/my';
import { deleteToken } from '@utils/token';
import { useHeaderStore } from '@zustands/header/headerStore';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchLogout } from 'src/api/member';

export default function MyPage({ hostSpaceData }: { hostSpaceData: HostSpaceData[] }) {
  const router = useRouter();

  const { setMainPageType } = useHeaderStore();

  const handleLogout = async () => {
    const res = await fetchLogout();
    if (res === 200) {
      deleteToken();
      router.push('/');
    }
  };

  return (
    <MyLayout>
      <div>
        <div className="flex flex-row items-center gap-3">
          <Image src={IMAGES.DiceBlack} alt="profile" width={54} height={54} />
          <p className="font-SUB1 text-SUB1 leading-SUB1">호스트 이름</p>
        </div>
        <div>
          <div className="mt-4 flex flex-row items-center justify-between">
            <p className="font-SUB3 text-SUB3 leading-SUB3">
              등록한 공간 <span className="text-purple">{hostSpaceData.length}개</span>
            </p>
            <p
              onClick={() => setMainPageType('popUp')}
              className="cursor-pointer font-CAP2 text-CAP2 leading-CAP2 text-medium_gray underline"
            >
              리스트 바로가기
            </p>
          </div>
          <MySpaceListComponent mySpaceList={hostSpaceData} />
        </div>
      </div>
      <div className="flex flex-col gap-6 font-SUB3 text-SUB3 leading-SUB3 text-deep_gray">
        <p onClick={() => router.push('/')} className="cursor-pointer">
          찜한 목록
        </p>
        <p onClick={() => router.push('/')} className="cursor-pointer">
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
      <p>탈퇴하기</p>
    </MyLayout>
  );
}
