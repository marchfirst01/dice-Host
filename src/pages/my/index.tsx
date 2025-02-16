import MyLayout from '@layout/myLayout';

import React from 'react';

export default function MyPage() {
  return (
    <MyLayout>
      <div>호스트 이름</div>
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
