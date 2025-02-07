import { IMAGES } from '@assets/index';
import RegisterFormButtonComponent from '@components/common/registerFormButton';
import UserInputComponent from '@components/member/userInput';
import { MemberFormData } from '@type/member';

import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { memberConfig, memberIdList } from 'src/context/member/memberConfig';

const RegisterPage = () => {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm<MemberFormData>();

  const onSubmit: SubmitHandler<MemberFormData> = (formData: MemberFormData) => {
    console.log(formData);
  };

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
        {/* id */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.id.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.id}
            control={control}
            rules={{ required: memberConfig.id.rules }}
          />
        </div>
        {/* password */}
        <div className="w-full">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {memberConfig.password.display}
          </p>
          <UserInputComponent
            memberConfig={memberConfig.password}
            control={control}
            rules={{ required: memberConfig.password.rules }}
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
          <UserInputComponent
            memberConfig={memberConfig.email}
            control={control}
            rules={{ required: memberConfig.email.rules }}
          />
        </div>
        {/* phone */}
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
