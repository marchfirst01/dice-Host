import { SpaceConfig, SpaceId } from '@type/space/spaceConfig';
import { SpaceFormData } from '@type/space/spaceType';

import React from 'react';
import { Control, Controller } from 'react-hook-form';

// Input에 적합하지 않은 필드들
const NON_INPUT_FIELDS = ['facilityInfo', 'imageList', 'popUpImageList'] as const;

// Input에 적합한 SpaceId 타입
type InputSpaceId = Exclude<SpaceId, (typeof NON_INPUT_FIELDS)[number]>;

interface SpaceInputComponentProps {
  config: SpaceConfig;
  control: Control<SpaceFormData>;
  rules?: any; // 타입 충돌을 피하기 위해 any 사용
}

// 런타임에 input 호환성 체크
function isInputCompatible(fieldName: SpaceId): fieldName is InputSpaceId {
  return !NON_INPUT_FIELDS.includes(fieldName as any);
}

export default function SpaceInputComponent({ config, control, rules }: SpaceInputComponentProps) {
  // 런타임에 input 호환성 체크
  if (!isInputCompatible(config.name)) {
    console.error(`${config.name} 필드는 SpaceInputComponent에서 사용할 수 없습니다.`);
    return null;
  }

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

        // value가 객체나 배열인 경우 빈 문자열로 처리
        let displayValue = '';
        if (typeof value === 'string') {
          displayValue = value;
        } else if (typeof value === 'number') {
          displayValue = value.toString();
        }

        // 숫자에 , 붙여주기
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
