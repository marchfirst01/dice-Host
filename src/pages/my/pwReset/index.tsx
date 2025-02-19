import { IMAGES } from '@assets/index';

import React from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface PwReset {
  password: string;
  new_password: string;
  new_password_check: string;
}

export default function PwResetPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PwReset>();

  const onSubmit = (resetPw: any) => {
    console.log(resetPw);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <input
            {...register('password', { required: '현재 비밀번호를 입력해주세요' })}
            className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <p className="mt-2 font-CAP2 text-CAP2 leading-CAP2 text-red">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <p>새 비밀번호</p>
          <input
            {...register('new_password', { required: '새로운 비밀번호를 입력해주세요' })}
            className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
            placeholder="새 비밀번호를 입력해주세요"
          />
          {errors.new_password && (
            <p className="mt-2 font-CAP2 text-CAP2 leading-CAP2 text-red">
              {errors.new_password.message}
            </p>
          )}
        </div>
        <div>
          <p>새 비밀번호 확인</p>
          <div>
            <input
              {...register('new_password_check', {
                required: '새로운 비밀번호를 한 번 더 입력해주세요',
                validate: (value) =>
                  value === watch('new_password') || '새 비밀번호가 일치하지 않습니다.',
              })}
              className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
              placeholder="새 비밀번호를 한 번 더 입력해주세요"
            />
          </div>
          {errors.new_password_check && (
            <p className="mt-2 font-CAP2 text-CAP2 leading-CAP2 text-red">
              {errors.new_password_check.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`mt-4 h-[52px] w-full rounded-lg ${isValid ? 'bg-black text-white' : 'bg-light_gray text-white'}`}
        >
          확인
        </button>
      </div>
    </form>
  );
}
