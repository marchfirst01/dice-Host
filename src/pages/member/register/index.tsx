import { IMAGES } from '@assets/index';
import InputComponent from '@components/common/Input';
import EmailInputComponent from '@components/common/emailInput';
import ModalComponent from '@components/common/modal';
import PhoneInputComponent from '@components/common/phoneInput';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import { MemberFormData } from '@type/member';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ValidateMemberError, fetchRegister, fetchValidateEmail } from 'src/api/member';
import { memberConfig } from 'src/context/member/memberConfig';

const RegisterPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<MemberFormData>({ mode: 'onChange' });
  const [emailError, setEmailError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<MemberFormData> = async (formData: MemberFormData) => {
    try {
      await fetchValidateEmail(formData.email);
      await fetchRegister(formData);
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof ValidateMemberError) setEmailError(error.message);
    }
  };

  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const phone_regex = /^010-\d{4}-\d{4}$/;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-6 px-5 pb-24 pt-20">
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>회원가입 성공</p>
        <button onClick={() => router.push('/')} className="mt-4 text-purple">
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
      <p className="w-full font-H1 text-H1 leading-H1">회원가입</p>
      <div className="flex flex-col gap-6 overflow-scroll">
        {/* name */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.name.display}
          </p>
          <InputComponent
            config={memberConfig.name}
            control={control}
            rules={{ required: memberConfig.name.rules }}
          />
        </div>
        {/* email */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.email.display}
          </p>
          <EmailInputComponent
            memberConfig={memberConfig.email}
            control={control}
            rules={{
              required: memberConfig.email.rules,
              validate: (value) => value.includes('@') || '도메인을 선택해주세요.',
            }}
          />
          {isValid &&
            (emailError ? (
              <p className="mt-2 font-CAP1 text-CAP1 leading-CAP1 text-red">{emailError}</p>
            ) : (
              <p className="font-CAP1 text-CAP1 leading-CAP1 text-green">
                {memberConfig.email.isValid}
              </p>
            ))}
        </div>
        {/* password */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.password.display}
          </p>
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
        {/* password_check */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.password_check.display}
          </p>
          <InputComponent
            config={memberConfig.password_check}
            control={control}
            rules={{
              required: memberConfig.password_check.rules,
              validate: (value) =>
                value === getValues('password') || '비밀번호가 일치하지 않습니다.',
            }}
          />
        </div>
        {/* phone */}
        <div>
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.phone.display}
          </p>
          <PhoneInputComponent
            memberConfig={memberConfig.phone}
            control={control}
            rules={{
              required: memberConfig.phone.rules,
              validate: (value) =>
                phone_regex.test(value) || '전화번호 형식을 맞춰서 입력해 주세요.',
            }}
          />
        </div>
        {/* bank - 임시 삭제, 마이페이지에서 등록 */}
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
