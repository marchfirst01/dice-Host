import { PopUpConfig, PopUpFormData } from '@type/popUpSetting';

import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface PopUpInputComponentProps {
  popUpConfig: PopUpConfig;
  control: Control<PopUpFormData>;
}

export default function PopUpInputComponent({
  popUpConfig,
  control,
}: PopUpInputComponentProps): React.ReactElement<PopUpInputComponentProps> {
  return (
    <Controller
      name={popUpConfig.name}
      control={control}
      render={({ field: { onChange, value = '' } }) => (
        <input
          className="h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
          onChange={onChange}
          value={value}
          placeholder={popUpConfig.placeholder}
        />
      )}
    />
  );
}
