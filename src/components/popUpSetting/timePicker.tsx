import { PopUpFormData } from '@type/popUpSetting';

import React, { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

const period = ['오전', '오후'];
const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const minutes = ['00', '10', '20', '30', '40', '50'];

const timeOptions = { period, hours, minutes };

function TimeList({
  type,
  onSelect,
  selectedValues,
}: {
  type: 'period' | 'hours' | 'minutes';
  onSelect: (type: 'period' | 'hours' | 'minutes', value: string) => void;
  selectedValues: { period: string; hours: string; minutes: string };
}) {
  return (
    <div className="flex w-12 flex-col gap-1 overflow-scroll pb-[240px] text-center">
      {timeOptions[type].map((item) => (
        <div
          key={item}
          onClick={() => onSelect(type, item)}
          className={`cursor-pointer rounded-lg p-2 hover:bg-back_gray ${
            selectedValues[type] === item ? 'bg-light_gray' : ''
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default function TimePickerComponents({
  type,
  control,
  rules,
}: {
  type: 'openingTime' | 'closingTime';
  control: Control<PopUpFormData>;
  rules: UseControllerProps<PopUpFormData, 'openingTime' | 'closingTime'>['rules'];
}) {
  const [openTimeModal, setOpenTimeModal] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<{
    period: string;
    hours: string;
    minutes: string;
  }>({
    period: '',
    hours: '',
    minutes: '',
  });

  return (
    <Controller
      name={type}
      control={control}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => {
        React.useEffect(() => {
          if (value) {
            const [p, h, m] = value.split(/[: ]/);
            setSelectedValues({ period: p, hours: h, minutes: m });
          }
        }, [value]);

        const handleSelect = (key: 'period' | 'hours' | 'minutes', newValue: string) => {
          const updatedValues = { ...selectedValues, [key]: newValue };
          setSelectedValues(updatedValues);

          // 모든 값이 선택되었을 때만 onChange 호출
          if (updatedValues.period && updatedValues.hours && updatedValues.minutes) {
            const formattedValue = `${updatedValues.period} ${updatedValues.hours}:${updatedValues.minutes}`;
            onChange(formattedValue);
          }
        };

        return (
          <div
            onClick={() => setOpenTimeModal(!openTimeModal)}
            className="relative flex h-[44px] w-full items-center rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
          >
            <p className={`${value ? 'text-black' : 'text-light_gray'}`}>
              {value || (type === 'openingTime' ? '시작 시간' : '마감 시간')}
            </p>

            {error && (
              <p className="absolute bottom-0 left-0 translate-y-full text-red">{error.message}</p>
            )}
            {openTimeModal && (
              <div
                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
                className="absolute left-0 top-11 z-10 mt-1 flex h-[275px] w-full flex-row justify-around overflow-auto rounded-lg border border-light_gray bg-white p-1"
              >
                <TimeList type="period" onSelect={handleSelect} selectedValues={selectedValues} />
                <TimeList type="hours" onSelect={handleSelect} selectedValues={selectedValues} />
                <TimeList type="minutes" onSelect={handleSelect} selectedValues={selectedValues} />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
