import { IMAGES } from '@assets/index';
import { MemberConfig, MemberFormData, MemberId } from '@type/member';

import React, { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';

interface UserInputComponentProps {
  memberConfig: MemberConfig;
  control: Control<MemberFormData>;
  rules?: UseControllerProps<MemberFormData, MemberId>['rules'];
}

export default function UserInputComponent({
  memberConfig,
  control,
  rules,
}: UserInputComponentProps): React.ReactElement<UserInputComponentProps> {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <Controller
      name={memberConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => {
        return (
          <div className="relative w-full">
            <input
              className={`h-[44px] w-full rounded-lg border p-4 ${error ? 'outline-red' : 'outline-black'} ${((memberConfig.name === 'password' && error?.type === 'validate') || (memberConfig.name === 'bank' && error)) && 'focus:outline-yellow'} `}
              type={memberConfig.type === 'default' || isPasswordVisible ? 'default' : 'password'}
              placeholder={memberConfig.placeholder}
              onChange={onChange}
              value={value}
            />
            {error && (
              <p
                className={`mt-2 font-CAP1 text-CAP1 leading-CAP1 ${memberConfig.name === 'password' && error.type === 'validate' && 'text-yellow'} ${memberConfig.name === 'bank' && 'text-yellow'} text-red`}
              >
                {error.message}
              </p>
            )}
            {!invalid && value && memberConfig.isValid && (
              <p className={`mt-2 font-CAP1 text-CAP1 leading-CAP1 text-green`}>
                {memberConfig.isValid}
              </p>
            )}
            {value ? (
              <Image
                onClick={() => onChange('')}
                className={`absolute top-0 m-[13px] cursor-pointer ${memberConfig.type === 'password' ? 'right-11' : 'right-0'}`}
                src={IMAGES.Delete}
                width={18}
                height={18}
                alt="delete"
              />
            ) : null}
            {memberConfig.type === 'password' ? (
              isPasswordVisible ? (
                <Image
                  onClick={() => setIsPasswordVisible(false)}
                  className="absolute right-0 top-0 m-[13px] cursor-pointer"
                  src={IMAGES.EyeOn}
                  width={18}
                  height={18}
                  alt="eye-on"
                />
              ) : (
                <Image
                  onClick={() => setIsPasswordVisible(true)}
                  className="absolute right-0 top-0 m-[13px] cursor-pointer"
                  src={IMAGES.EyeOff}
                  width={18}
                  height={18}
                  alt="eye-off"
                />
              )
            ) : null}
          </div>
        );
      }}
    />
  );
}
