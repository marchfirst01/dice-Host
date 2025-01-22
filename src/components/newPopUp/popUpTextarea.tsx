import { NewPopUp } from '@type/newPopUp/newPopUpTypes';

import React from 'react';
import { Controller } from 'react-hook-form';

interface PopUpTextareaComponentProps {
  newPopUpInfo: NewPopUp;
  control: any;
}

export default function PopUpTextareaComponent({
  newPopUpInfo,
  control,
}: PopUpTextareaComponentProps): React.ReactElement<PopUpTextareaComponentProps> {
  return (
    <Controller
      name={newPopUpInfo.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <textarea
          className="h-40 w-full rounded-lg border border-stroke p-4 font-CAP1 text-CAP1 leading-CAP1 placeholder:font-BODY2 placeholder:text-BODY2 placeholder:leading-BODY2"
          onChange={onChange}
          value={value}
          placeholder={newPopUpInfo.placeholder}
        />
      )}
    />
  );
}
