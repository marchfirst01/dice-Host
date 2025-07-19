import { FACILITY } from '@assets/facility';
import { FacilityKey } from '@type/common';
import { FacilityConfig } from '@type/space/facilityConfig';
import { SpaceFormData } from '@type/space/spaceType';

import React, { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';

export default function FacilitySetting({
  item,
  setValue,
  getValues,
}: {
  item: FacilityConfig;
  setValue: UseFormSetValue<SpaceFormData>;
  getValues: UseFormGetValues<SpaceFormData>;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);

  // 컴포넌트 마운트 시 초기 상태 설정
  useEffect(() => {
    const currentFacilityInfo = getValues('facilityInfo') || [];
    const existingItem = currentFacilityInfo.find((facility) => facility.key === item.id);
    setIsSelected(!!existingItem);
    setCurrentNumber(existingItem?.number || 0);
  }, [item.id, getValues]);

  // 아이템 클릭 시 추가/제거 처리
  const handleItemClick = () => {
    const facilityInfo = getValues('facilityInfo') || [];

    if (isSelected) {
      // 이미 선택된 아이템이면 배열에서 제거
      const updatedFacilityInfo = facilityInfo.filter((facility) => facility.key !== item.id);
      setValue('facilityInfo', updatedFacilityInfo);
      setIsSelected(false);
      setCurrentNumber(0);
    } else {
      // 선택되지 않은 아이템이면 배열에 추가 (기본 수량 1)
      const updatedFacilityInfo = [...facilityInfo, { key: item.id as FacilityKey, number: 1 }];
      setValue('facilityInfo', updatedFacilityInfo);
      setIsSelected(true);
      setCurrentNumber(1);
    }
  };

  // + 버튼 클릭 시 수량 증가
  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
    const facilityInfo = getValues('facilityInfo') || [];

    if (isSelected) {
      const updatedFacilityInfo = facilityInfo.map((facility) =>
        facility.key === item.id ? { ...facility, number: facility.number + 1 } : facility,
      );
      setValue('facilityInfo', updatedFacilityInfo);
      setCurrentNumber(currentNumber + 1);
    } else {
      // 선택되지 않은 상태에서 +를 누르면 아이템 추가
      const updatedFacilityInfo = [...facilityInfo, { key: item.id as FacilityKey, number: 1 }];
      setValue('facilityInfo', updatedFacilityInfo);
      setIsSelected(true);
      setCurrentNumber(1);
    }
  };

  // - 버튼 클릭 시 수량 감소
  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
    const facilityInfo = getValues('facilityInfo') || [];

    if (isSelected && currentNumber > 1) {
      // 수량이 1보다 크면 감소
      const updatedFacilityInfo = facilityInfo.map((facility) =>
        facility.key === item.id ? { ...facility, number: facility.number - 1 } : facility,
      );
      setValue('facilityInfo', updatedFacilityInfo);
      setCurrentNumber(currentNumber - 1);
    } else if (isSelected && currentNumber === 1) {
      // 수량이 1이면 아이템 제거
      const updatedFacilityInfo = facilityInfo.filter((facility) => facility.key !== item.id);
      setValue('facilityInfo', updatedFacilityInfo);
      setIsSelected(false);
      setCurrentNumber(0);
    }
  };

  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between rounded-lg border-2 border-stroke p-2 ${isSelected && 'bg-back_gray'}`}
      onClick={handleItemClick}
    >
      <div className="flex flex-row items-center">
        <Image src={isSelected ? FACILITY.check : FACILITY.checkGrey} alt="check" />
        <Image
          className="ml-4 mr-2"
          src={
            FACILITY[isSelected ? item.id : (`${item.id}Grey` as keyof typeof FACILITY)] ||
            FACILITY[item.id]
          }
          width={30}
          height={30}
          alt={item.name}
        />
        <p className={`font-medium ${isSelected ? 'text-dark_gray' : 'text-medium_gray'}`}>
          {item.name}
        </p>
      </div>

      {/* 수량 조절 버튼 영역 */}
      <div className="flex flex-row items-center space-x-2">
        <div className="flex flex-row items-center space-x-1">
          <Image
            onClick={handleDecrease}
            src={isSelected ? FACILITY.minus : FACILITY.minusGrey}
            alt="minus"
          />
          <p className="w-[30px] text-center">{currentNumber}</p>
          <Image
            onClick={handleIncrease}
            src={isSelected ? FACILITY.plus : FACILITY.plusGrey}
            alt="plus"
          />
        </div>
      </div>
    </div>
  );
}
