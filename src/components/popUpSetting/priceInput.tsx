import { PopUpConfig, PopUpFormData } from '@type/popUpSetting';

import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

interface PriceInputComponentProps {
  popUpConfig: PopUpConfig;
  control: Control<PopUpFormData>;
  rules: UseControllerProps<PopUpFormData, 'pricePerDay'>['rules'];
}

export default function PriceInputComponents({
  popUpConfig,
  control,
  rules,
}: PriceInputComponentProps): React.ReactElement<PriceInputComponentProps> {
  const handleInputChange = (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    onChange(formattedValue);
  };

  return (
    <Controller
      name="pricePerDay"
      control={control}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <>
          <input
            className="h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1 placeholder:text-light_gray"
            onChange={handleInputChange(onChange)}
            value={value}
            placeholder={popUpConfig.placeholder}
          />
          {error && <p className="text-red">{error.message}</p>}
        </>
      )}
    />
  );
}
