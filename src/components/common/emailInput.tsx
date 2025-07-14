import { IMAGES } from '@assets/index';
import { MemberConfig, MemberFormData, MemberId } from '@type/member';

import React, { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';
import { emailList } from 'src/context/member/memberConfig';

interface EmailInputComponentProps {
  memberConfig: MemberConfig;
  control: Control<MemberFormData>;
  rules?: UseControllerProps<MemberFormData, MemberId>['rules'];
}

// TODO: EmailInputComponent 갈아엎기...^^
export default function EmailInputComponent({
  memberConfig,
  control,
  rules,
}: EmailInputComponentProps) {
  const [isEmailClick, setIsEmailClick] = useState<boolean>(false);
  const [selectedEmailDomain, setSelectedEmailDomain] = useState('');
  const [emailInput, setEmailInput] = useState(''); // 최상위에서 상태 관리
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Controller
      name={memberConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value = '' }, fieldState: { error, isTouched } }) => {
        const handleChangeEmail = (onChange: (value: string) => void) => {
          if (selectedEmailDomain && emailInput) {
            onChange(`${emailInput}@${selectedEmailDomain}`); // 이메일 형식으로 변경하여 전달
          } else {
            onChange(emailInput); // 도메인 없으면 앞부분만 onChange
          }
        };

        return (
          <div className="relative w-full">
            <div
              className={`flex h-[44px] flex-row items-center justify-between rounded-lg border p-4 ${focus && (error ? 'border-2 border-red' : 'border-2 border-black')}`}
            >
              <div className="relative">
                <input
                  onClick={() => setFocus(true)}
                  className="w-full pr-5 outline-none focus:border-none"
                  type="text"
                  placeholder={memberConfig.placeholder}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    handleChangeEmail(onChange);
                  }}
                  onBlur={() => {
                    onBlur();
                    setFocus(false);
                  }}
                  value={emailInput}
                />
                {value ? (
                  <Image
                    onClick={() => {
                      onChange('');
                      setEmailInput('');
                    }}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer`}
                    src={IMAGES.Delete}
                    width={18}
                    height={18}
                    alt="delete"
                  />
                ) : null}
              </div>
              <p className="mx-[7.67px]">@</p>
              <div
                onClick={() => setIsEmailClick(!isEmailClick)}
                className="relative flex w-1/2 cursor-pointer flex-row justify-between text-light_gray"
              >
                <p className={`${selectedEmailDomain && 'text-black'}`}>
                  {selectedEmailDomain ? selectedEmailDomain : '선택하기'}
                </p>
                <Image
                  src={IMAGES.ArrowBlackDown}
                  alt="arrow"
                  className={`${isEmailClick && 'rotate-180'}`}
                />
                {isEmailClick && (
                  <div className="absolute -bottom-3 z-10 flex w-full translate-y-full flex-col rounded-xl border border-light_gray bg-white">
                    {emailList.map((email, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedEmailDomain(email);
                          setIsEmailClick(false); // 선택 후 드롭다운 닫기
                          handleChangeEmail(onChange);
                        }}
                        className="text-style-BTN1 px-2 py-[11.5px] text-medium_gray hover:bg-back_gray"
                      >
                        {email}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {error && isTouched && (
              <p
                className={`text-style-CAP1 mt-2 ${memberConfig.name === 'password' && error.type === 'validate' && 'text-yellow'} ${memberConfig.name === 'bank' && 'text-yellow'} text-red`}
              >
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
