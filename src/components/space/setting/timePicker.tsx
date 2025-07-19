import { SpaceFormData } from '@type/space/spaceType';

import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, UseControllerProps, useWatch } from 'react-hook-form';

// 시간 옵션
const period = ['오전', '오후'];
const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const minutes = ['00', '10', '20', '30', '40', '50'];

const timeOptions = { period, hours, minutes };

// 스크롤바 숨기는 CSS
const scrollbarHideCSS = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

function TimeList({
  type,
  onSelect,
  selectedValues,
}: {
  type: 'period' | 'hours' | 'minutes';
  onSelect: (type: 'period' | 'hours' | 'minutes', value: string) => void;
  selectedValues: { period: string; hours: string; minutes: string };
}) {
  const listRef = useRef<HTMLDivElement>(null);

  // 선택된 값으로 스크롤
  useEffect(() => {
    if (listRef.current && selectedValues[type]) {
      const selectedIndex = timeOptions[type].findIndex((item) => item === selectedValues[type]);
      if (selectedIndex !== -1) {
        const itemHeight = 40; // p-2 padding 포함한 대략적인 아이템 높이
        listRef.current.scrollTop = selectedIndex * itemHeight;
      }
    }
  }, [selectedValues, type]);

  return (
    <div
      ref={listRef}
      className="mx-auto flex w-full max-w-[100px] flex-col gap-1 overflow-scroll pb-[240px]"
      style={{ maxHeight: '220px' }}
    >
      {timeOptions[type].map((item) => (
        <div
          key={item}
          onClick={() => onSelect(type, item)}
          className={`cursor-pointer rounded-lg p-2 text-center hover:bg-back_gray ${
            selectedValues[type] === item ? 'bg-light_gray font-bold' : ''
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default function CustomTimePickerComponent({
  type,
  control,
  rules,
}: {
  type: 'openingTime' | 'closingTime';
  control: Control<SpaceFormData>;
  rules: UseControllerProps<SpaceFormData, 'openingTime' | 'closingTime'>['rules'];
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
  const [formattedValue, setFormattedValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // useWatch로 현재 필드 값을 감지 (Hook 규칙 준수)
  const watchedValue = useWatch({
    control,
    name: type,
    defaultValue: '',
  });

  // 컴포넌트 초기화 시 기존 값 로드 (Hook을 최상위로 이동)
  useEffect(() => {
    if (watchedValue && watchedValue !== formattedValue) {
      setFormattedValue(watchedValue);
    }
  }, [watchedValue, formattedValue]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenTimeModal(false);
      }
    }

    if (openTimeModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openTimeModal]);

  // 저장된 값이 있을 경우 selectedValues 업데이트
  useEffect(() => {
    if (formattedValue) {
      const [p, h, m] = formattedValue.split(/[: ]/);
      setSelectedValues({ period: p, hours: h, minutes: m });
    }
  }, [formattedValue]);

  return (
    <Controller
      name={type}
      control={control}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => {
        const handleSelect = (key: 'period' | 'hours' | 'minutes', newValue: string) => {
          const updatedValues = { ...selectedValues, [key]: newValue };
          setSelectedValues(updatedValues);

          // 값이 모두 선택되었을 때 onChange 호출
          if (updatedValues.period && updatedValues.hours && updatedValues.minutes) {
            const newFormattedValue = `${updatedValues.period} ${updatedValues.hours}:${updatedValues.minutes}`;
            onChange(newFormattedValue);
            setFormattedValue(newFormattedValue);

            // 초기 선택이든 수정이든 상관없이, 모든 필드가 채워졌을 때만 모달 닫기
            setTimeout(() => {
              setOpenTimeModal(false);
            }, 300);
          }
        };

        return (
          <>
            {/* 스크롤바 숨기기 스타일 추가 */}
            <style>{scrollbarHideCSS}</style>

            <div className="relative w-full">
              <div
                onClick={() => setOpenTimeModal(!openTimeModal)}
                className="text-style-CAP1 flex h-[44px] w-full cursor-pointer items-center rounded-lg border p-4"
              >
                <p className={`${value ? 'text-black' : 'text-light_gray'}`}>
                  {value || (type === 'openingTime' ? '시작 시간' : '마감 시간')}
                </p>
              </div>

              {error && (
                <p className="absolute bottom-0 left-0 translate-y-full text-red">
                  {error.message}
                </p>
              )}

              {openTimeModal && (
                <div
                  ref={modalRef}
                  className="absolute left-0 top-11 z-10 mt-1 flex h-[220px] w-full flex-row justify-between rounded-lg border border-light_gray bg-white p-2 shadow-lg"
                >
                  <div className="flex-1 text-center">
                    <TimeList
                      type="period"
                      onSelect={handleSelect}
                      selectedValues={selectedValues}
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <TimeList
                      type="hours"
                      onSelect={handleSelect}
                      selectedValues={selectedValues}
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <TimeList
                      type="minutes"
                      onSelect={handleSelect}
                      selectedValues={selectedValues}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }}
    />
  );
}
