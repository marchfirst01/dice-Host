import { PopUpConfig, PopUpFormData } from '@type/popUpSetting';

import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface PopUpTextareaComponentProps {
  popUpConfig: PopUpConfig;
  control: Control<PopUpFormData>;
}

export default function PopUpTextareaComponent({
  popUpConfig,
  control,
}: PopUpTextareaComponentProps): React.ReactElement<PopUpTextareaComponentProps> {
  return (
    <Controller
      name={popUpConfig.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <textarea
          className="h-40 w-full rounded-lg border border-stroke p-4 font-CAP1 text-CAP1 leading-CAP1 placeholder:font-BODY2 placeholder:text-BODY2 placeholder:leading-BODY2"
          onChange={onChange}
          value={value}
          placeholder={popUpConfig.placeholder}
        />
      )}
    />
  );
}
