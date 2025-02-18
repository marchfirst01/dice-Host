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

  const handlePhoneNumberInputChange =
    (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기

      // 000-0000-0000 형식으로 변환
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 7) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
      }
      onChange(value);
    };

  return (
    <Controller
      name={memberConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => {
        return (
          <div className="relative w-full">
            <input
              className="h-[44px] w-full rounded-lg border p-4"
              type={memberConfig.type === 'default' || isPasswordVisible ? 'default' : 'password'}
              placeholder={memberConfig.placeholder}
              onChange={
                memberConfig.name === 'phone' ? handlePhoneNumberInputChange(onChange) : onChange
              }
              value={value}
            />
            {error && (
              <p
                className={`ml-2 mt-2 font-CAP1 text-CAP1 leading-CAP1 ${memberConfig.name === 'password' && error.type === 'validate' && 'text-yellow'} ${memberConfig.name === 'bank' && 'text-yellow'} text-red`}
              >
                {error.message}
              </p>
            )}
            {!invalid && value && memberConfig.isValid && (
              <p className={`ml-2 mt-2 font-CAP1 text-CAP1 leading-CAP1 text-green`}>
                {memberConfig.isValid}
              </p>
            )}
            {value ? (
              <Image
                onClick={() => onChange('')}
                className={`absolute top-0 m-[13px] ${memberConfig.type === 'password' ? 'right-11' : 'right-0'}`}
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
                  className="absolute right-0 top-0 m-[13px]"
                  src={IMAGES.EyeOn}
                  width={18}
                  height={18}
                  alt="eye-on"
                />
              ) : (
                <Image
                  onClick={() => setIsPasswordVisible(true)}
                  className="absolute right-0 top-0 m-[13px]"
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
