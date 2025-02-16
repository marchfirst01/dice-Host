import { IMAGES } from '@assets/index';
import MySpaceListComponent from '@components/my/mySpaceList';
import MyLayout from '@layout/myLayout';

import React from 'react';

import { mySpaceDummy } from './mySpaceDummy';
import Image from 'next/image';

export default function MyPage() {
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
              등록한 공간 <span className="text-purple">4개</span>
            </p>
            <p className="font-CAP2 text-CAP2 leading-CAP2 text-medium_gray underline">
              리스트 바로가기
            </p>
          </div>
          <MySpaceListComponent mySpaceList={mySpaceDummy} />
        </div>
      </div>
      <div className="flex flex-col gap-6 font-SUB3 text-SUB3 leading-SUB3 text-deep_gray">
        <p>찜한 목록</p>
        <p>쪽지함</p>
        <hr />
        <p>회원 정보 관리</p>
        <p>이용 약관</p>
        <p>개인정보 처리방침</p>
        <hr />
        <p>로그아웃</p>
      </div>
      <p>탈퇴하기</p>
    </MyLayout>
  );
}
