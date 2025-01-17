import Delete from '@assets/member/delete.svg';
import EyeOff from '@assets/member/eye-off.svg';
import EyeOn from '@assets/member/eye-on.svg';
import { Member } from '@type/member';

import React, { useState } from 'react';

import Image from 'next/image';

interface UserInputComponentProps {
  member: Member;
}

export default function UserInputComponent({
  member,
}: UserInputComponentProps): React.ReactElement<UserInputComponentProps> {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  return (
    <div className="relative">
      <input
        className={`h-[44px] w-full rounded-lg border p-4 ${
          isFocused ? 'border-black' : 'border-light_gray'
        }`}
        type={member.type === 'default' || isPasswordVisible ? 'default' : 'password'}
        placeholder={member.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Image
        className={`absolute top-0 m-[13px] ${member.type === 'password' ? 'right-11' : 'right-0'}`}
        src={Delete}
        width={18}
        height={18}
        alt="delete"
      />
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
  );
}
