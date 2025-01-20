import { NewPopUp } from '@type/newPopUp/newPopUpTypes';

import React from 'react';
import { Controller } from 'react-hook-form';

interface PopUpInputComponentProps {
  newPopUpInfo: NewPopUp;
  control: any;
}

export default function PopUpInputComponent({
  newPopUpInfo,
  control,
}: PopUpInputComponentProps): React.ReactElement<PopUpInputComponentProps> {
  return (
    <Controller
      name={newPopUpInfo.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <input
          className="h-[44px] w-full rounded-lg border p-4"
          onChange={onChange}
          value={value}
          placeholder={newPopUpInfo.placeholder}
        />
      )}
    />
  );
}
