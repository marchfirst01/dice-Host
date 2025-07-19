import { FACILITY } from '@assets/facility';
import { FacilityKey } from '@type/common';
import { FacilityConfig } from '@type/space/facilityConfig';
import { SpaceFormData } from '@type/space/spaceType';

import React from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import Image from 'next/image';

interface FacilityListProps {
  facilities: FacilityConfig[];
  setValue: UseFormSetValue<SpaceFormData>;
  watch: UseFormWatch<SpaceFormData>;
}

export default function FacilityList({ facilities, setValue, watch }: FacilityListProps) {
  const facilityInfo = watch('facilityInfo') || [];

  const handleItemClick = (facilityId: string) => {
    const existingItem = facilityInfo.find((facility) => facility.key === facilityId);

    if (existingItem) {
      // 이미 선택된 아이템이면 배열에서 제거
      const updatedFacilityInfo = facilityInfo.filter((facility) => facility.key !== facilityId);
      setValue('facilityInfo', updatedFacilityInfo);
    } else {
      // 선택되지 않은 아이템이면 배열에 추가
      const updatedFacilityInfo = [...facilityInfo, { key: facilityId as FacilityKey, number: 1 }];
      setValue('facilityInfo', updatedFacilityInfo);
    }
  };

  const handleIncrease = (facilityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const existingItem = facilityInfo.find((facility) => facility.key === facilityId);

    if (existingItem) {
      const updatedFacilityInfo = facilityInfo.map((facility) =>
        facility.key === facilityId ? { ...facility, number: facility.number + 1 } : facility,
      );
      setValue('facilityInfo', updatedFacilityInfo);
    } else {
      const updatedFacilityInfo = [...facilityInfo, { key: facilityId as FacilityKey, number: 1 }];
      setValue('facilityInfo', updatedFacilityInfo);
    }
  };

  const handleDecrease = (facilityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const existingItem = facilityInfo.find((facility) => facility.key === facilityId);

    if (existingItem && existingItem.number > 1) {
      const updatedFacilityInfo = facilityInfo.map((facility) =>
        facility.key === facilityId ? { ...facility, number: facility.number - 1 } : facility,
      );
      setValue('facilityInfo', updatedFacilityInfo);
    } else if (existingItem && existingItem.number === 1) {
      const updatedFacilityInfo = facilityInfo.filter((facility) => facility.key !== facilityId);
      setValue('facilityInfo', updatedFacilityInfo);
    }
  };

  return (
    <div className="text-style-CAP1 flex w-full flex-col gap-3">
      {facilities.map((facility) => {
        const existingItem = facilityInfo.find((f) => f.key === facility.id);
        const isSelected = !!existingItem;
        const currentNumber = existingItem?.number || 0;

        return (
          <div
            key={facility.id}
            className={`flex cursor-pointer flex-row items-center justify-between rounded-lg border-2 border-stroke p-2 ${
              isSelected && 'bg-back_gray'
            }`}
            onClick={() => handleItemClick(facility.id)}
          >
            <div className="flex flex-row items-center">
              <Image src={isSelected ? FACILITY.check : FACILITY.checkGrey} alt="check" />
              <Image
                className="ml-4 mr-2"
                src={
                  FACILITY[
                    isSelected ? facility.id : (`${facility.id}Grey` as keyof typeof FACILITY)
                  ] || FACILITY[facility.id]
                }
                width={30}
                height={30}
                alt={facility.name}
              />
              <p className={`font-medium ${isSelected ? 'text-dark_gray' : 'text-medium_gray'}`}>
                {facility.name}
              </p>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-row items-center space-x-1">
                <Image
                  onClick={(e) => handleDecrease(facility.id, e)}
                  src={isSelected ? FACILITY.minus : FACILITY.minusGrey}
                  alt="minus"
                />
                <p className="w-[30px] text-center">{currentNumber}</p>
                <Image
                  onClick={(e) => handleIncrease(facility.id, e)}
                  src={isSelected ? FACILITY.plus : FACILITY.plusGrey}
                  alt="plus"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
