import { IMAGES } from '@assets/index';
import { PopUpFormData } from '@type/popUpSetting';

import { useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import Image from 'next/image';
import { category } from 'src/context/popUpSetting/category';

interface PlaceTypeDropdownComponentProps {
  control: Control<PopUpFormData>;
  rules: UseControllerProps<PopUpFormData, 'category'>['rules'];
}

export default function PlaceTypeDropdownComponent({
  control,
  rules,
}: PlaceTypeDropdownComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Controller
      name="category"
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="relative flex h-11 w-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-full cursor-pointer items-center justify-start rounded-lg border border-stroke px-4 text-light_gray"
          >
            {value ? category.find((item) => item.id === value)?.name : '공간 유형을 선택해주세요'}
            {isMenuOpen ? (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2 rotate-180"
                src={IMAGES.ArrowDownGray}
                alt="arrow-down"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2"
                src={IMAGES.ArrowDownGray}
                alt="arrow-down"
                width={24}
                height={24}
              />
            )}
          </button>
          {error && <p className="absolute bottom-0 translate-y-full text-red">{error.message}</p>}
          {isMenuOpen && (
            <div className="absolute top-11 z-10 mt-1 h-36 w-full overflow-auto rounded-lg border border-light_gray bg-white p-1">
              {category.map((place, index) => (
                <div
                  onClick={() => {
                    onChange(place.id);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  key={index}
                  className="flex h-[44px] w-full flex-shrink-0 items-center rounded-lg bg-white px-4 text-light_gray hover:bg-back_gray hover:text-dark_gray"
                >
                  {place.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
