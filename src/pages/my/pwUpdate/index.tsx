import { IMAGES } from '@assets/index';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import UserInputComponent from '@components/member/userInput';
import { PwResetForm } from '@type/host';

import React from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchPasswordUpdate } from 'src/api/host';
import { passwordUpdateConfig } from 'src/context/host/passwordUpdateConfig';

export default function PwUpdatePage() {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<PwResetForm>({ mode: 'onChange' });

  const onSubmit = async (resetPw: PwResetForm) => {
    try {
      const res = await fetchPasswordUpdate({
        password: resetPw.password,
        newPassword: resetPw.new_password,
      });
      if (res === 200) {
        alert('비밀번호 변경 완료!');
        router.push('/main');
      }
    } catch (error) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return (
    <div>
      <header className="flex flex-row bg-white">
        <div onClick={() => router.back()} className="cursor-pointer px-3 py-3">
          <Image src={IMAGES.ArrowBackBlack} alt="back" />
        </div>
        <p className="flex-grow py-3 text-center font-SUB3 text-SUB3 leading-SUB3">
          비밀번호 재설정
        </p>
        <div className="w-12" />
      </header>
      <div className="flex flex-col gap-6 px-5 py-6 font-CAP1 text-CAP1 leading-CAP1">
        <div>
          <p>현재 비밀번호</p>
          <UserInputComponent
            config={passwordUpdateConfig.password}
            control={control}
            rules={{ required: passwordUpdateConfig.password.rules }}
          />
        </div>
        <div>
          <p>새 비밀번호</p>
          <UserInputComponent
            config={passwordUpdateConfig.new_password}
            control={control}
            rules={{
              required: passwordUpdateConfig.new_password.rules,
              validate: (value) =>
                password_regex.test(value) ||
                '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.',
            }}
          />
        </div>
        <div>
          <p>새 비밀번호 확인</p>
          <UserInputComponent
            config={passwordUpdateConfig.new_password_check}
            control={control}
            rules={{
              required: passwordUpdateConfig.new_password_check.rules,
              validate: (value) =>
                value === watch('new_password') || '새 비밀번호가 일치하지 않습니다.',
            }}
          />
        </div>
        <RegisterFormButtonComponent handleSubmit={handleSubmit} onSubmit={onSubmit}>
          확인
        </RegisterFormButtonComponent>
      </div>
    </div>
  );
}
