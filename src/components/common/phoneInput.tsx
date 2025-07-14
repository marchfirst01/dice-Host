import { IMAGES } from '@assets/index';
import { MemberConfig, MemberFormData, MemberId } from '@type/member';

import React, { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';
import { ValidateMemberError, fetchValidatePhone } from 'src/api/member';

interface PhoneInputComponentProps {
  memberConfig: MemberConfig;
  control: Control<MemberFormData>;
  rules?: UseControllerProps<MemberFormData, MemberId>['rules'];
}

export default function PhoneInputComponent({
  memberConfig,
  control,
  rules,
}: PhoneInputComponentProps): React.ReactElement<PhoneInputComponentProps> {
  const [validatePhone, setValidatePhone] = useState<boolean>(false);
  const [phoneMessage, setPhoneMessage] = useState<string>('');

  const handlePhoneNumberInputChange =
    (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
      let phoneValue;

      // 000-0000-0000 형식으로 변환
      if (value.length <= 3) {
        phoneValue = value;
      } else if (value.length <= 7) {
        phoneValue = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        phoneValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
      }
      onChange(phoneValue); // 수정된 value를 onChange로 전달
    };

  return (
    <Controller
      name={memberConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handlePhoneValidate = async () => {
          try {
            await fetchValidatePhone(value);
            setPhoneMessage(memberConfig.isValid);
            setValidatePhone(true);
          } catch (error) {
            if (error instanceof ValidateMemberError) setPhoneMessage(error.message);
          }
        };

        return (
          <div className="relative w-full">
            <div className="flex w-full flex-row gap-2">
              <div className="relative">
                <input
                  className={`h-[44px] w-full rounded-lg border p-4 ${error || (phoneMessage && phoneMessage !== memberConfig.isValid) ? 'outline-red' : 'outline-black'}`}
                  placeholder={memberConfig.placeholder}
                  disabled={validatePhone}
                  onChange={
                    memberConfig.name === 'phone'
                      ? handlePhoneNumberInputChange(onChange)
                      : onChange
                  }
                  value={value} // value는 prop으로 그대로 사용
                />
                {value && !validatePhone ? (
                  <Image
                    onClick={() => {
                      onChange(''); // 전화번호를 비움
                      setPhoneMessage('');
                    }}
                    className={`absolute top-0 m-[13px] cursor-pointer ${memberConfig.type === 'password' ? 'right-11' : 'right-0'}`}
                    src={IMAGES.Delete}
                    width={18}
                    height={18}
                    alt="delete"
                  />
                ) : null}
              </div>
              <button
                onClick={() => {
                  if (!validatePhone && value) handlePhoneValidate();
                  else {
                    setValidatePhone(false);
                    setPhoneMessage('');
                  }
                }}
                className="text-nowrap rounded-xl border border-stroke px-[41.5px]"
              >
                {validatePhone ? '재인증하기' : '중복 확인'}
              </button>
            </div>
            {error && (
              <p
                className={`text-style-CAP1 mt-2 ${memberConfig.name === 'password' && error.type === 'validate' && 'text-yellow'} ${memberConfig.name === 'bank' && 'text-yellow'} text-red`}
              >
                {error.message}
              </p>
            )}
            {phoneMessage && (
              <p
                className={`text-style-CAP1 mt-2 ${phoneMessage === memberConfig.isValid ? 'text-green' : 'text-red'} `}
              >
                {phoneMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
