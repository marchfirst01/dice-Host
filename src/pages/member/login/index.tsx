import { IMAGES } from '@assets/index';
import UserInputComponent from '@components/common/Input';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import { MemberFormData } from '@type/member';
import { setAccessToken, setRefreshToken } from '@utils/token';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchLogin } from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

export default function LoginPage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<MemberFormData>();

  const onSubmit: SubmitHandler<MemberFormData> = async (formData: MemberFormData) => {
    try {
      const res = await fetchLogin(formData);
      setAccessToken(res.token.accessToken);
      setRefreshToken(res.token.refreshToken);
      router.push('/main');
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-8 px-5">
      <Image
        onClick={() => router.back()}
        className="absolute left-0 top-0 m-3 cursor-pointer"
        src={IMAGES.Close}
        width={12}
        height={12}
        alt="close"
      />
      <p className="w-full font-H1 text-H1 leading-H1">로그인</p>
      <div className="flex w-full flex-col gap-3">
        <UserInputComponent
          memberConfig={memberConfig.email}
          control={control}
          rules={{ required: memberConfig.email.rules }}
        />
        <UserInputComponent
          config={memberConfig.password}
          control={control}
          rules={{ required: memberConfig.password.rules }}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <RegisterFormButtonComponent<MemberFormData>
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          로그인
        </RegisterFormButtonComponent>
        <p
          onClick={() => router.push('/member/password')}
          className="cursor-pointer font-BTN1 text-BTN1 leading-BTN1 text-medium_gray"
        >
          비밀번호 찾기
        </p>
      </div>
    </div>
  );
}
