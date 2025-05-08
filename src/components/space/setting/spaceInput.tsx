import { SpaceConfig, SpaceId } from '@type/space/spaceConfig';
import { SpaceFormData } from '@type/space/spaceType';

import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

interface SpaceInputComponentProps {
  config: SpaceConfig;
  control: Control<SpaceFormData>;
  rules?: UseControllerProps<SpaceFormData, SpaceId>['rules'];
}

export default function SpaceInputComponent({ config, control, rules }: SpaceInputComponentProps) {
  return (
    <Controller
      name={config.name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (config.handleOnChange) {
            config.handleOnChange(e, { onChange });
          } else {
            onChange(e.target.value);
          }
        };

        // 숫자에 , 붙여주기
        let displayValue = value;

        if (config.type === 'number' && value !== null && value !== undefined && value !== '') {
          if (typeof value === 'number') {
            displayValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }

        return (
          <div className="relative w-full">
            <input
              id="input"
              className="text-style-CAP1 h-[44px] w-full rounded-lg border p-4 placeholder:text-light_gray"
              onChange={handleChange}
              value={displayValue}
              placeholder={config.placeholder}
            />
            {error && (
              <p className="absolute bottom-0 translate-y-full text-red">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
