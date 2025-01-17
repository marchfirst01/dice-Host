import CommonButtonComponent from '@components/common/commonButton';
import UserInputComponent from '@components/member/userInput';
import { member } from '@lib/member/member';

import React from 'react';

export default function LoginPage() {
  return (
    <div>
      로그인
      <UserInputComponent member={member.id} />
      <UserInputComponent member={member.password} />
      <CommonButtonComponent>로그인</CommonButtonComponent>
    </div>
  );
}
