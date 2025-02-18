import { IMAGES } from '@assets/index';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import EmailInputComponent from '@components/member/emailInput';
import UserInputComponent from '@components/member/userInput';
import { MemberFormData } from '@type/member';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ValidateEmailError, fetchRegister, fetchValidateEmail } from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

const RegisterPage = () => {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm<MemberFormData>({ mode: 'onChange' });
  const [emailError, setEmailError] = useState<string>('');

  const onSubmit: SubmitHandler<MemberFormData> = async (formData: MemberFormData) => {
    try {
      await fetchValidateEmail(formData.email);
      // TODO: 휴대폰 번호 중복확인
      await fetchRegister(formData);
      alert('회원가입 성공!');
      router.push('/');
    } catch (error) {
      if (error instanceof ValidateEmailError) setEmailError(error.message);
    }
  };

  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-6 px-5 pb-24 pt-20">
      <Image
        onClick={() => router.back()}
        className="absolute left-0 top-0 m-3 cursor-pointer"
        src={IMAGES.Close}
        width={12}
        height={12}
        alt="close"
      />
      <p className="w-full font-H1 text-H1 leading-H1">회원가입</p>
      <div className="flex flex-col gap-6 overflow-scroll">
        {/* name */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.name.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.name}
            control={control}
            rules={{ required: memberConfig.name.rules }}
          />
        </div>
        {/* email */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.email.display}
          </p>
          {/* TODO: 이메일 선택 드롭다운 */}
          <EmailInputComponent
            memberConfig={memberConfig.email}
            control={control}
            rules={{
              required: memberConfig.email.rules,
              validate: (value) => value.includes('@') || '도메인을 선택해주세요.',
            }}
          />
          {emailError && (
            <p className="mt-2 font-CAP1 text-CAP1 leading-CAP1 text-red">{emailError}</p>
          )}
        </div>
        {/* password */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.password.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.password}
            control={control}
            rules={{
              required: memberConfig.password.rules,
              validate: (value) =>
                password_regex.test(value) ||
                '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.',
            }}
          />
        </div>
        {/* password_check */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.password_check.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.password_check}
            control={control}
            rules={{
              required: memberConfig.password_check.rules,
              validate: (value) =>
                value === getValues('password') || '비밀번호가 일치하지 않습니다.',
            }}
          />
        </div>
        {/* phone */}
        {/* TODO: 인증번호 버튼, 입력칸 만들기 */}
        <div>
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.phone.display}
          </p>
          <div className="flex w-full flex-row gap-2">
            <div className="w-[90%]">
              <UserInputComponent
                memberConfig={memberConfig.phone}
                control={control}
                rules={{ required: memberConfig.phone.rules }}
              />
            </div>
            <div>
              <UserInputComponent memberConfig={memberConfig.auth} control={control} />
            </div>
          </div>
        </div>
        {/* bank */}
        {/* TODO: 은행 선택 창 필요 */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.bank.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.bank}
            control={control}
            rules={{
              required: memberConfig.bank.rules,
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-0 my-5 flex w-full flex-col items-center gap-3 px-5">
        <RegisterFormButtonComponent handleSubmit={handleSubmit} onSubmit={onSubmit}>
          회원가입
        </RegisterFormButtonComponent>
      </div>
    </div>
  );
};

export default RegisterPage;
