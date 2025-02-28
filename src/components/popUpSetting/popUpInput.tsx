import { PopUpConfig, PopUpFormData, PopUpId } from '@type/popUpSetting';
import { formatNumber } from '@utils/formatNumber';

import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

interface PopUpInputComponentProps {
  popUpConfig: PopUpConfig;
  control: Control<PopUpFormData>;
  rules?: UseControllerProps<PopUpFormData, PopUpId>['rules'];
}

export default function PopUpInputComponent({
  popUpConfig,
  control,
  rules,
}: PopUpInputComponentProps): React.ReactElement<PopUpInputComponentProps> {
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
      onChange(phoneValue);
    };

  const handleCapacityInputChange =
    (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
      onChange(value);
    };

  const handlePricePerDayInputChange =
    (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue = value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      onChange(formattedValue);
    };

  const handleDiscountInputChange =
    (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/[^\d]/g, ''); // 숫자만 필터링
      if (value !== '') {
        value = Math.min(Math.max(Number(value), 0), 100).toString(); // 0~100 범위 제한
      }
      onChange(value); // 문자열 값만 저장
    };

  return (
    <Controller
      name={popUpConfig.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <div className="relative w-full">
          <input
            id="input"
            className="h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1 placeholder:text-light_gray"
            onChange={
              (popUpConfig.name === 'contactNumber' && handlePhoneNumberInputChange(onChange)) ||
              (popUpConfig.name === 'capacity' && handleCapacityInputChange(onChange)) ||
              (popUpConfig.name === 'pricePerDay' && handlePricePerDayInputChange(onChange)) ||
              (popUpConfig.name === 'discountRate' && handleDiscountInputChange(onChange)) ||
              onChange
            }
            value={typeof value === 'object' ? '' : value}
            placeholder={popUpConfig.placeholder}
          />
          {error && <p className="absolute bottom-0 translate-y-full text-red">{error.message}</p>}
        </div>
      )}
    />
  );
}
