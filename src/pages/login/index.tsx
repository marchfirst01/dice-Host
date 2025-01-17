import CommonButtonComponent from '@components/common/commonButton';
import UserInputComponent from '@components/member/userInput';
import { member } from '@lib/member/member';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
  id: string;
  passwd: string;
}

export default function LoginPage() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    console.log(formData);
  };
  return (
    <div>
      로그인
      <UserInputComponent member={member.id} control={control} />
      <UserInputComponent member={member.password} control={control} />
      <CommonButtonComponent onClick={handleSubmit(onSubmit)}>로그인</CommonButtonComponent>
    </div>
  );
}
