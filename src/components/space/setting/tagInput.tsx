import { SpaceFormData } from '@type/space/spaceFormData';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

import React, { useEffect, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';

interface TagInputComponentProps {
  control: Control<SpaceFormData>;
  setValue: (name: keyof SpaceFormData, value: string[]) => void; // setValue 타입 정의
}

export default function TagInputComponent({ control, setValue }: TagInputComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagifyRef = useRef<Tagify | null>(null);

  useEffect(() => {
    if (!inputRef.current) {
      console.log('❌ inputRef.current가 null임!');
      return;
    }

    tagifyRef.current = new Tagify(inputRef.current, {
      delimiters: /[\s,]/, // 스페이스바 또는 콤마 입력 시 태그 생성
      trim: true,
      maxTags: 5, // 최대 5개 제한
    });

    // 이벤트 리스너 등록 (onChange 사용)
    tagifyRef.current.on('change', (e) => {
      try {
        const tagData = e.detail.value ? JSON.parse(e.detail.value) : []; // 빈 문자열이면 빈 배열로 처리
        const tagArray = tagData.map((tag: { value: string }) => tag.value); // 배열로 변환
        setValue('tags', tagArray); // react-hook-form에 저장
      } catch (error) {
        console.error('❌ JSON 파싱 에러:', error);
      }
    });

    return () => {
      tagifyRef.current?.destroy();
    };
  }, [setValue]);

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field: { value } }) => {
        return (
          <input
            ref={inputRef}
            defaultValue={JSON.stringify(value)}
            className="text-style-CAP1 min-h-[44px] w-full rounded-lg border p-4 placeholder:text-light_gray"
            placeholder="태그 입력 (최대 5개)..."
          />
        );
      }}
    />
  );
}
