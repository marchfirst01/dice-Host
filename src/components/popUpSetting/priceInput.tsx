import { PopUpConfig, PopUpFormData } from '@type/popUpSetting';

import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface PriceInputComponentProps {
  popUpConfig: PopUpConfig;
  control: Control<PopUpFormData>;
}

export default function PriceInputComponents({
  popUpConfig,
  control,
}: PriceInputComponentProps): React.ReactElement<PriceInputComponentProps> {
  const handleInputChange = (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    onChange(formattedValue);
  };

  return (
    <Controller
      name={popUpConfig.name}
      control={control}
      render={({ field: { onChange, value = '' } }) => (
        <input
          className="h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
          onChange={handleInputChange(onChange)}
          value={value}
          placeholder={popUpConfig.placeholder}
        />
      )}
    />
  );
}
