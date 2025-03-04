import { IMAGES } from '@assets/index';
import InputComponent from '@components/common/Input';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import { MemberFormData } from '@type/member';
import { useFindPassword } from '@zustands/findPassword/store';

import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ValidateMemberError,
  fetchAuthVerify,
  fetchAuthVerifyCode,
  fetchPasswordReset,
} from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

function VerifyAuth() {
  const { control, handleSubmit, getValues } = useForm<MemberFormData>({ mode: 'onChange' });
  const { setEmail, code, setCode, setStep } = useFindPassword();
  const [sendEmail, setSendEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit: SubmitHandler<MemberFormData> = async (memberData: MemberFormData) => {
    try {
      setIsLoading(true);
      setEmail(memberData.email);
      const res = await fetchAuthVerify(memberData.email);
      if (res === 200) {
        setSendEmail(true);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof ValidateMemberError) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthVerifyCode = async () => {
    if (!code) {
      alert('코드를 입력해주세요');
      return;
    }
    try {
      const email = getValues('email');
      const res = await fetchAuthVerifyCode(code, email);
      if (res.isVerified) {
        alert('이메일 인증 성공');
        setStep(1);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ValidateMemberError) setErrorMsg(error.message);
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
        {sendEmail && !isLoading && (
          <p className="mt-1 font-CAP1 text-CAP1 leading-CAP1 text-green">
            인증번호가 발송됐습니다.
          </p>
        )}
      </div>
      {sendEmail && (
        <div>
          <div className="flex flex-row justify-between gap-2">
            <input
              className="h-11 w-full rounded-lg border p-4"
              placeholder="인증번호를 입력해주세요"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleAuthVerifyCode}
              className="h-11 w-[135px] rounded-lg border border-stroke font-BTN1 text-BTN1 leading-BTN1 text-light_gray"
            >
              인증
            </button>
          </div>
          {errorMsg && <p className="mt-1 font-CAP1 text-CAP1 leading-CAP1 text-red">{errorMsg}</p>}
        </div>
      )}
      <RegisterFormButtonComponent
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        disabled={isLoading}
      >
        인증번호 보내기
      </RegisterFormButtonComponent>
    </div>
  );
}

function ResetPassword() {
  const { email, code, setStep } = useFindPassword();
  const [tempPw, setTempPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getTempPw = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchPasswordReset(code, email);
      console.log(res);
      setTempPw(res.tempPassword);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [code, email]);

  useEffect(() => {
    getTempPw();
  }, [getTempPw]);

  if (isLoading)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Image src={IMAGES.DiceLoading} alt="loading" />
        <p className="absolute">페이지 로딩중 ...</p>
      </div>
    );

  return (
    <div className="relative flex h-full flex-col items-center justify-center pb-[100px]">
      {/* TODO: 임시 아이콘 */}
      <div className="mb-10 flex size-10 items-center justify-center rounded-full bg-black">
        <Image className="bg-black" src={IMAGES.SendWhite} alt="send" width={24} height={24} />
      </div>
      <div className="text-center font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
        <span className="font-SUB2 text-SUB2 leading-SUB2 text-black">{email}</span>님의
        <br />
        임시 비밀번호가 발급됐습니다.
        <br />
        <p className="mt-1 font-SUB3 text-SUB3 leading-SUB3 text-black">{tempPw}</p>
      </div>
      <button
        onClick={() => {
          setStep(0);
          router.push('/member/login');
        }}
        className="absolute bottom-0 mb-[30px] h-[52px] w-full rounded-xl bg-black font-BTN1 text-BTN1 leading-BTN1 text-white"
      >
        확인
      </button>
    </div>
  );
}

export default function PasswordPage() {
  const { step } = useFindPassword();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col">
      <header className="relative mb-6 flex h-12 items-center">
        <Image
          onClick={router.back}
          className="absolute m-3 cursor-pointer"
          src={IMAGES.ArrowBackBlack}
          alt="back"
        />
        <p className="w-full text-center">{step === 2 ? '비밀번호 재설정' : '비밀번호 찾기'}</p>
      </header>
      <div className="h-full px-5">
        {step === 0 && <VerifyAuth />}
        {step === 1 && <ResetPassword />}
      </div>
    </div>
  );
}
