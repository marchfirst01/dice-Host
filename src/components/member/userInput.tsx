import { IMAGES } from '@assets/index';
import { MemberConfig, MemberFormData } from '@type/member';

import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Image from 'next/image';

interface UserInputComponentProps {
  memberConfig: MemberConfig;
  control: Control<MemberFormData>;
}

export default function UserInputComponent({
  memberConfig,
  control,
}: UserInputComponentProps): React.ReactElement<UserInputComponentProps> {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <Controller
      name={memberConfig.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="relative w-full">
          <input
            className="h-[44px] w-full rounded-lg border p-4"
            type={memberConfig.type === 'default' || isPasswordVisible ? 'default' : 'password'}
            placeholder={memberConfig.placeholder}
            onChange={onChange}
            value={value}
          />
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
