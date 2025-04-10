import { IMAGES } from '@assets/index';
import MySpaceListComponent from '@components/my/mySpaceList';
import MyLayout from '@layout/myLayout';
import { HostInfoForm, HostSpaceData } from '@type/my';
import { deleteToken } from '@utils/token';
import { useHeaderStore } from '@zustands/header/headerStore';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchLogout } from 'src/api/member';

export default function MyPage({
  hostSpaceData,
  hostInfo,
}: {
  hostSpaceData: HostSpaceData[];
  hostInfo: HostInfoForm;
}) {
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
    hostInfo && (
      <MyLayout>
        <div>
          <div className="flex flex-row items-center gap-3">
            <Image src={IMAGES.DiceBlack} alt="profile" width={54} height={54} />
            <p className="text-style-SUB1">{hostInfo.name}</p>
          </div>
          <div>
            <div className="mt-4 flex flex-row items-center justify-between">
              {hostSpaceData && (
                <p className="text-style-SUB3">
                  등록한 공간 <span className="text-purple">{hostSpaceData.length}개</span>
                </p>
              )}
              <p
                onClick={() => setMainPageType('popUp')}
                className="text-style-CAP2 cursor-pointer text-medium_gray underline"
              >
                리스트 바로가기
              </p>
            </div>
            <MySpaceListComponent mySpaceList={hostSpaceData} />
          </div>
        </div>
        <div className="text-style-SUB3 flex flex-col gap-6 text-deep_gray">
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
          onClick={() => router.push({ pathname: '/my/withDraw', query: { name: hostInfo.name } })}
          className="text-style-SUB3 cursor-pointer text-deep_gray"
        >
          탈퇴하기
        </p>
      </MyLayout>
    )
  );
}
