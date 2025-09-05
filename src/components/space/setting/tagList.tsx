import { SpaceFormData } from '@type/space/spaceType';

import React from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface TagListProps {
  category: string;
  tags: string[];
  setValue: UseFormSetValue<SpaceFormData>;
  watch: UseFormWatch<SpaceFormData>;
}

export default function TagList({ category, tags, setValue, watch }: TagListProps) {
  const selectedTags = watch('tags') || [];

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setValue(
        'tags',
        selectedTags.filter((tag) => tag !== tagName),
      );
    } else {
      setValue('tags', [...selectedTags, tagName]);
    }
  };

  return (
    <div>
      <h3 className="text-style-CAP1 mb-1">{category}</h3>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <div
              key={index}
              onClick={() => handleTagClick(tag)}
              className={`text-style-CAP1 w-fit cursor-pointer rounded-full border px-[10px] py-1 text-deep_gray ${isSelected ? 'border-purple text-purple' : 'border-stroke text-deep_gray'}`}
            >
              # {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
