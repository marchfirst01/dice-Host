import { IMAGES } from '@assets/index';
import InputComponent from '@components/common/Input';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import { MemberFormData } from '@type/member';
import { useFindPassword } from '@zustands/findPassword/store';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { ValidateMemberError, fetchRequestPasswordReset } from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

function RequestPassword() {
  const { control, handleSubmit } = useForm<MemberFormData>({ mode: 'onChange' });
  const { setName, setEmail, setStep } = useFindPassword();

  const onSubmit: SubmitHandler<MemberFormData> = async (memberData: MemberFormData) => {
    try {
      const res = await fetchRequestPasswordReset(memberData);
      if (res === 200) {
        setName(memberData.name);
        setEmail(memberData.email);
        setStep(1);
      }
    } catch (error) {
      if (error instanceof ValidateMemberError) alert(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-CAP1 text-CAP1 leading-CAP1">이름</p>
        <InputComponent
          config={memberConfig.name}
          control={control}
          rules={{ required: memberConfig.name.rules }}
        />
      </div>
      <div>
        <p className="font-CAP1 text-CAP1 leading-CAP1">이메일 아이디</p>
        <InputComponent
          config={memberConfig.email}
          control={control}
          rules={{
            required: memberConfig.email.rules,
            validate: (value) => value.includes('@') || '도메인을 선택해주세요.',
          }}
        />
      </div>
      <RegisterFormButtonComponent handleSubmit={handleSubmit} onSubmit={onSubmit}>
        이메일로 인증하기
      </RegisterFormButtonComponent>
    </div>
  );
}

function RequestCheck() {
  const { email, setStep } = useFindPassword();
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      {/* TODO: 임시 아이콘 */}
      <div className="mb-10 flex size-10 items-center justify-center rounded-full bg-black">
        <Image className="bg-black" src={IMAGES.SendWhite} alt="send" width={24} height={24} />
      </div>
      <p className="text-center font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
        <span className="font-SUB2 text-SUB2 leading-SUB2 text-black">{email}</span>으로
        <br />
        비밀번호 재설정 이메일이 전송됐습니다.
      </p>
      <button
        onClick={() => setStep(2)}
        className="absolute bottom-0 mb-[30px] h-[52px] w-full rounded-xl bg-black font-BTN1 text-BTN1 leading-BTN1 text-white"
      >
        확인
      </button>
    </div>
  );
}

function ResetPassword() {
  const { control, handleSubmit, getValues } = useForm<MemberFormData>({ mode: 'onChange' });

  const onSubmit = (newPassword: MemberFormData) => {
    console.log(newPassword);
  };

  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2">새 비밀번호</p>
        <InputComponent
          config={memberConfig.password}
          control={control}
          rules={{
            required: memberConfig.password.rules,
            validate: (value) =>
              password_regex.test(value) ||
              '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.',
          }}
        />
      </div>
      <div>
        <p className="mb-2">새 비밀번호 확인</p>
        <InputComponent
          config={memberConfig.password_check}
          control={control}
          rules={{
            required: memberConfig.password_check.rules,
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          }}
        />
      </div>
      <RegisterFormButtonComponent handleSubmit={handleSubmit} onSubmit={onSubmit}>
        확인
      </RegisterFormButtonComponent>
    </div>
  );
}

export default function PasswordPage() {
  const { step } = useFindPassword();

  return (
    <div className="flex h-screen flex-col">
      <header className="relative mb-6 flex h-12 items-center">
        <Image className="absolute m-3" src={IMAGES.ArrowBackBlack} alt="back" />
        <p className="w-full text-center">{step === 2 ? '비밀번호 재설정' : '비밀번호 찾기'}</p>
      </header>
      <div className="h-full px-5">
        {step === 0 && <RequestPassword />}
        {step === 1 && <RequestCheck />}
        {step === 2 && <ResetPassword />}
      </div>
    </div>
  );
}
