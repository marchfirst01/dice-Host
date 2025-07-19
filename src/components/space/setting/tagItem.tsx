import { SpaceFormData } from '@type/space/spaceType';

import React, { useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export default function TagItem({
  children,
  setValue,
  getValues,
}: {
  children: string;
  setValue: UseFormSetValue<SpaceFormData>;
  getValues: UseFormGetValues<SpaceFormData>;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleTags = () => {
    const currentTags = getValues('tags') || [];
    if (currentTags.includes(children)) {
      setValue(
        'tags',
        currentTags.filter((tag) => tag !== children),
      );
      setIsSelected(false);
    } else {
      setValue('tags', [...currentTags, children]);
      setIsSelected(true);
    }
  };

  return (
    <div
      onClick={handleTags}
      className={`text-style-CAP1 w-fit cursor-pointer rounded-full border border-stroke px-[10px] py-1 text-deep_gray ${isSelected && 'border-purple text-purple'}`}
    >
      # {children}
    </div>
  );
}
