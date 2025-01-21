import { NewPopUp, NewPopUpFormData } from '@type/newPopUp/newPopUpTypes';

import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface PriceInputComponentProps {
  newPopUpInfo: NewPopUp;
  control: Control<NewPopUpFormData>;
}

export default function PriceInputComponents({
  newPopUpInfo,
  control,
}: PriceInputComponentProps): React.ReactElement<PriceInputComponentProps> {
  const handleInputChange = (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    onChange(formattedValue);
  };

  return (
    <Controller
      name={newPopUpInfo.name}
      control={control}
      render={({ field: { onChange, value = '' } }) => (
        <input
          className="h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
          onChange={handleInputChange(onChange)}
          value={value}
          placeholder={newPopUpInfo.placeholder}
        />
      )}
    />
  );
}
