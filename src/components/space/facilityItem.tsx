import { FACILITY } from '@assets/facility';
import { FacilityKey } from '@type/common';

import React from 'react';

import Image from 'next/image';
import { FacilityConfig } from 'src/context/space/facilityConfig';

export default function FacilityItem({
  facility,
}: {
  facility: { id: FacilityKey; number: number };
}) {
  return (
    <div className="flex w-full flex-row items-center gap-2">
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-stroke bg-back_gray">
        <Image src={FACILITY[facility.id]} alt="facility" width={24} height={24} />
      </div>
      <p className="text-style-BODY1 text-deep_gray">
        {FacilityConfig[facility.id].name}{' '}
        {facility.number !== 0 && <span>{facility.number}개</span>}
      </p>
    </div>
  );
}
