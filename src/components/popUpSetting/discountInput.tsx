import { IMAGES } from '@assets/index';
import { PopUpFormData } from '@type/popUpSetting';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Image from 'next/image';

interface DiscountInputComponentProps {
  control: Control<PopUpFormData>;
  discountType: '할인율' | '할인 금액';
  setDiscountType: Dispatch<SetStateAction<'할인율' | '할인 금액'>>;
}

export default function DiscountInputComponent({
  control,
  discountType,
  setDiscountType,
}: DiscountInputComponentProps): React.ReactElement<DiscountInputComponentProps> {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handlePercentInputChange =
    (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let numericValue = value.replace(/[^\d]/g, '');

      if (numericValue !== '') {
        numericValue = Math.min(Math.max(parseInt(numericValue, 10), 0), 100).toString();
      }

      onChange(numericValue);
    };

  const handlePriceInputChange =
    (onChange: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let numericValue = value.replace(/[^\d]/g, '');

      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      onChange(formattedValue);
    };

  const handleDiscountBtn = (selectedType: '할인율' | '할인 금액', onChange: Function) => {
    setDiscountType(selectedType);
    if (selectedType !== discountType) onChange('');
  };

  return (
    <Controller
      name="discount"
      control={control}
      render={({ field: { onChange, value = '' } }) => (
        <div className="flex w-full flex-row gap-2">
          {discountType === '할인율' ? (
            <input
              className="h-11 flex-1 rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
              onChange={handlePercentInputChange(onChange)}
              value={value}
              placeholder="0~100 사이의 숫자로 입력해주세요"
            />
          ) : (
            <input
              className="h-11 flex-1 rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1"
              onChange={handlePriceInputChange(onChange)}
              value={value}
              placeholder="할인 금액을 입력해주세요"
            />
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex h-11 w-[107px] cursor-pointer flex-row items-center justify-center gap-[5px] rounded-lg border border-stroke px-[10px] font-BTN1 text-BTN1 leading-BTN1 text-light_gray"
          >
            {discountType}
            {isMenuOpen ? (
              <Image className="rotate-180" src={IMAGES.ArrowDownGray} alt="arrow-up" />
            ) : (
              <Image src={IMAGES.ArrowDownGray} alt="arrow-down" />
            )}
            {isMenuOpen && (
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute top-11 w-full rounded-lg border border-light_gray bg-white p-1"
              >
                <div
                  onClick={() => handleDiscountBtn('할인율', onChange)}
                  className="flex h-11 items-center justify-start rounded-lg px-4 text-medium_gray hover:bg-back_gray hover:text-dark_gray"
                >
                  할인율
                </div>
                <div
                  onClick={() => handleDiscountBtn('할인 금액', onChange)}
                  className="flex h-11 items-center justify-start rounded-lg px-4 text-medium_gray hover:bg-back_gray hover:text-dark_gray"
                >
                  할인 금액
                </div>
              </div>
            )}
          </button>
        </div>
      )}
    />
  );
}
