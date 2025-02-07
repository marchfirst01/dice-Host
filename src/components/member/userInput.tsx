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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="relative w-full">
          <input
            className="h-[44px] w-full rounded-lg border p-4"
            type={memberConfig.type === 'default' || isPasswordVisible ? 'default' : 'password'}
            placeholder={memberConfig.placeholder}
            onChange={onChange}
            value={value}
          />
          {error && (
            <p className="absolute bottom-0 ml-2 mt-0.5 translate-y-full font-CAP1 text-CAP1 leading-CAP1 text-red">
              {error.message}
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
      )}
    />
  );
}
