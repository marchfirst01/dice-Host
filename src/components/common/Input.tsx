import { IMAGES } from '@assets/index';
import { PwResetConfig, PwResetForm } from '@type/host';
import { MemberConfig, MemberFormData } from '@type/member';
import { HostInfoConfig, HostInfoForm } from '@type/my';

import React, { useState } from 'react';
import { Control, Controller, Path, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';

interface InputComponentProps<
  T extends MemberConfig | PwResetConfig | HostInfoConfig,
  U extends MemberFormData | PwResetForm | HostInfoForm,
  V extends Path<U>,
> {
  config: T;
  control: Control<U>;
  rules?: UseControllerProps<U, V>['rules'];
}

export default function InputComponent<
  T extends MemberConfig | PwResetConfig | HostInfoConfig,
  U extends MemberFormData | PwResetForm | HostInfoForm,
  V extends Path<U>,
>({
  config,
  control,
  rules,
}: InputComponentProps<T, U, V>): React.ReactElement<InputComponentProps<T, U, V>> {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <Controller
      name={config.name as V}
      control={control}
      rules={rules}
      render={({ field: { onChange, value = '', ref }, fieldState: { error } }) => (
        <div className="relative w-full">
          <input
            ref={ref}
            className="h-[44px] w-full rounded-lg border p-4"
            type={config.type === 'default' || isPasswordVisible ? 'text' : 'password'}
            placeholder={config.placeholder}
            onChange={onChange}
            value={value || ''}
          />
          {error && (
            <p className="mt-1 font-CAP1 text-CAP1 leading-CAP1 text-red">{error.message}</p>
          )}
          {value ? (
            <Image
              onClick={() => onChange('')}
              className={`absolute top-0 m-[13px] ${config.type === 'password' ? 'right-11' : 'right-0'}`}
              src={IMAGES.Delete}
              width={18}
              height={18}
              alt="delete"
            />
          ) : null}
          {config.type === 'password' ? (
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
