import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';

interface FilterComponentProps {
  filter: string;
}

const FilterComponent = ({
  filter,
}: FilterComponentProps): React.ReactElement<FilterComponentProps> => {
  return (
    <div
      // 추후 수정 필요
      onClick={() => console.log(filter)}
      className="flex cursor-pointer flex-row items-center gap-1 rounded-full border bg-back_gray py-[5.5px] pl-3 pr-2 font-BTN1 text-BTN1 leading-BTN1 text-deep_gray"
    >
      {filter}
      <Image src={IMAGES.ArrowDownGray} alt="arrow-down" />
    </div>
  );
};

export default FilterComponent;
