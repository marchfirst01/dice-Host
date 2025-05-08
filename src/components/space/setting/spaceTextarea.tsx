import { SpaceConfig, SpaceId } from '@type/space/spaceConfig';
import { SpaceFormData } from '@type/space/spaceFormData';

import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

interface SpaceTextareaComponentProps {
  config: SpaceConfig;
  control: Control<SpaceFormData>;
  rules: UseControllerProps<SpaceFormData, SpaceId>['rules'];
}

export default function SpaceTextareaComponent({
  config,
  control,
  rules,
}: SpaceTextareaComponentProps): React.ReactElement<SpaceTextareaComponentProps> {
  return (
    <Controller
      name={config.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <textarea
            className="text-style-CAP1 h-40 w-full rounded-lg border border-stroke p-4 placeholder:font-BODY2 placeholder:text-BODY2 placeholder:leading-BODY2 placeholder:text-light_gray"
            onChange={onChange}
            value={typeof value === 'object' ? '' : value}
            placeholder={config.placeholder}
          />
          {error && <p className="text-red">{error.message}</p>}
        </>
      )}
    />
  );
}
