import { IMAGES } from '@assets/index';
import InputComponent from '@components/common/Input';
import ModalComponent from '@components/common/modal';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import { MemberFormData } from '@type/member';
import { setAccessToken, setRefreshToken } from '@utils/token';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchLogin } from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

export default function LoginPage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<MemberFormData>({ mode: 'onChange' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<MemberFormData> = async (formData: MemberFormData) => {
    try {
      const res = await fetchLogin(formData);
      setAccessToken(res.token.accessToken);
      setRefreshToken(res.token.refreshToken);
      router.push('/space');
    } catch (error) {
      console.log(error);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-8 px-5">
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>로그인에 실패했습니다</p>
        <button onClick={() => setIsModalOpen(false)} className="mt-4 text-purple">
          확인
        </button>
      </ModalComponent>
      <Image
        onClick={() => router.push('/')}
        className="absolute left-0 top-0 m-3 cursor-pointer"
        src={IMAGES.Close}
        width={12}
        height={12}
        alt="close"
      />
      <p className="text-style-H1 w-full">로그인</p>
      <div className="flex w-full flex-col gap-3">
        <InputComponent
          config={memberConfig.email}
          control={control}
          rules={{ required: memberConfig.email.rules }}
        />
        <InputComponent
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
          className="text-style-BTN1 cursor-pointer text-medium_gray"
        >
          비밀번호 찾기
        </p>
      </div>
    </div>
  );
}
