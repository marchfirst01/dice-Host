import ArrowDown from '@assets/popUpDetail/gray-arrow-down.svg';
import ArrowUp from '@assets/popUpDetail/gray-arrow-up.svg';
import { placeType } from '@lib/newPopUp/placeTypes';
import { PopUpFormData } from '@type/popUpSetting';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Image from 'next/image';

interface PlaceTypeDropdownComponentProps {
  control: Control<PopUpFormData>;
}

export default function PlaceTypeDropdownComponent({ control }: PlaceTypeDropdownComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Controller
      name="placeType"
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="relative flex h-11 w-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-full cursor-pointer items-center justify-start rounded-lg border border-stroke px-4 text-medium_gray"
          >
            {value ? value : '공간 유형을 선택해주세요'}
            {isMenuOpen ? (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2"
                src={ArrowUp}
                alt="arrow-down"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2"
                src={ArrowDown}
                alt="arrow-down"
                width={24}
                height={24}
              />
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute top-11 mt-1 h-36 w-full overflow-auto rounded-lg border border-light_gray bg-white p-1">
              {placeType.map((place, index) => (
                <div
                  onClick={() => {
                    onChange(place);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  key={index}
                  className="flex h-[44px] w-full flex-shrink-0 items-center rounded-lg bg-white px-4 text-light_gray hover:bg-back_gray hover:text-dark_gray"
                >
                  {place}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
