import { IMAGES } from '@assets/index';
import { MemberConfig, MemberFormData, MemberId } from '@type/member';

import React, { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';

interface BankInputComponentProps {
  memberConfig: MemberConfig;
  control: Control<MemberFormData>;
  rules?: UseControllerProps<MemberFormData, MemberId>['rules'];
}

export default function BankInputComponent({
  memberConfig,
  control,
  rules,
}: BankInputComponentProps): React.ReactElement<BankInputComponentProps> {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <Controller
      name={memberConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => {
        return (
          <div className="relative w-full">
            <div
              className={`flex h-[44px] flex-row items-center justify-between rounded-lg border p-4 ${focus && (error ? 'border-2 border-yellow' : 'border-2 border-black')}`}
            >
              <div className="relative">
                <input
                  onClick={() => setFocus(true)}
                  className="w-full pr-7 outline-none focus:border-none"
                  placeholder={memberConfig.placeholder}
                  onChange={onChange}
                  onBlur={() => setFocus(false)}
                  value={value}
                />
                {value ? (
                  <Image
                    onClick={() => onChange('')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer`}
                    src={IMAGES.Delete}
                    width={18}
                    height={18}
                    alt="delete"
                  />
                ) : null}
              </div>
              <p className="text-light_gray">|</p>
              {/* TODO: 은행 선택창 */}
              <button className="w-[118px] text-nowrap text-light_gray">은행 선택</button>
            </div>
            {error && (
              <p className="mt-2 font-CAP1 text-CAP1 leading-CAP1 text-yellow">{error.message}</p>
            )}
            {!invalid && value && memberConfig.isValid && (
              <p className={`mt-2 font-CAP1 text-CAP1 leading-CAP1 text-green`}>
                {memberConfig.isValid}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
