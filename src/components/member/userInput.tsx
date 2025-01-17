import Delete from '@assets/member/delete.svg';
import EyeOff from '@assets/member/eye-off.svg';
import EyeOn from '@assets/member/eye-on.svg';
import { Member } from '@type/member';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import Image from 'next/image';

interface UserInputComponentProps {
  member: Member;
  control: any;
}

export default function UserInputComponent({
  member,
  control,
}: UserInputComponentProps): React.ReactElement<UserInputComponentProps> {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <Controller
      name={member.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="relative">
          <input
            className="h-[44px] w-full rounded-lg border p-4"
            type={member.type === 'default' || isPasswordVisible ? 'default' : 'password'}
            placeholder={member.placeholder}
            onChange={onChange}
            value={value}
          />
          {value ? (
            <Image
              onClick={() => onChange('')}
              className={`absolute top-0 m-[13px] ${member.type === 'password' ? 'right-11' : 'right-0'}`}
              src={Delete}
              width={18}
              height={18}
              alt="delete"
            />
          ) : null}
          {member.type === 'password' ? (
            isPasswordVisible ? (
              <Image
                onClick={() => setIsPasswordVisible(false)}
                className="absolute right-0 top-0 m-[13px]"
                src={EyeOn}
                width={18}
                height={18}
                alt="eye-on"
              />
            ) : (
              <Image
                onClick={() => setIsPasswordVisible(true)}
                className="absolute right-0 top-0 m-[13px]"
                src={EyeOff}
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
