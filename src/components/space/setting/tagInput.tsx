import { SpaceFormData } from '@type/space/spaceType';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

import React, { useEffect, useRef } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';

interface TagInputComponentProps {
  control: Control<SpaceFormData>;
  setValue: (name: keyof SpaceFormData, value: string[]) => void;
}

export default function TagInputComponent({ control, setValue }: TagInputComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagifyRef = useRef<Tagify | null>(null);
  const isTagifyChanging = useRef<boolean>(false);

  // react-hook-form의 useWatch를 사용하여 tags 필드 변경 감지
  const tags = useWatch({
    control,
    name: 'tags',
    defaultValue: [],
  });

  useEffect(() => {
    if (!inputRef.current) {
      console.log('❌ inputRef.current가 null임!');
      return;
    }

    // Tagify 초기화
    if (!tagifyRef.current) {
      tagifyRef.current = new Tagify(inputRef.current, {
        delimiters: /[\s,]/, // 스페이스바 또는 콤마 입력 시 태그 생성
        trim: true,
        maxTags: 5, // 최대 5개 제한
      });

      // Tagify 이벤트 리스너 등록 (onChange 사용)
      tagifyRef.current.on('change', (e) => {
        try {
          // 무한 루프 방지: 외부(reset)에 의한 변경 시 이벤트 무시
          if (isTagifyChanging.current) return;

          const tagData = e.detail.value ? JSON.parse(e.detail.value) : []; // 빈 문자열이면 빈 배열로 처리
          const tagArray = tagData.map((tag: { value: string }) => tag.value); // 배열로 변환
          setValue('tags', tagArray); // react-hook-form에 저장
        } catch (error) {
          console.error('❌ JSON 파싱 에러:', error);
        }
      });
    }

    return () => {
      if (tagifyRef.current) {
        tagifyRef.current.destroy();
        tagifyRef.current = null;
      }
    };
  }, [setValue]);

  // tags 값이 변경될 때 Tagify에 반영 (reset 함수 호출 시 동작)
  useEffect(() => {
    if (tagifyRef.current && Array.isArray(tags)) {
      try {
        // 현재 Tagify의 태그 값 가져오기
        const currentTagsInTagify = tagifyRef.current.value || [];
        const currentValues = currentTagsInTagify.map((tag: { value: string }) => tag.value);

        // 현재 Tagify 값과 새 tags 값이 다른 경우에만 업데이트
        // JSON.stringify로 깊은 비교 수행
        if (JSON.stringify(currentValues) !== JSON.stringify(tags)) {
          isTagifyChanging.current = true; // 외부 변경 플래그 설정

          // 기존 태그 모두 제거 후 새로운 태그 추가
          tagifyRef.current.removeAllTags();

          if (tags.length > 0) {
            tagifyRef.current.addTags(tags);
          }

          // 플래그 리셋 (약간의 지연 후)
          setTimeout(() => {
            isTagifyChanging.current = false;
          }, 100);
        }
      } catch (error) {
        console.error('❌ Tagify 업데이트 에러:', error);
        isTagifyChanging.current = false;
      }
    }
  }, [tags]);

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <input
          ref={inputRef}
          className="text-style-CAP1 min-h-[44px] w-full rounded-lg border p-4 placeholder:text-light_gray"
          placeholder="태그 입력 (최대 5개)..."
        />
      )}
    />
  );
}
