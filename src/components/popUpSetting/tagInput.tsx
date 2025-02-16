import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

import React, { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';

export default function TagInputComponent({ control }: { control: any }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagifyRef = useRef<Tagify | null>(null);

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => {
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
              onChange(tagArray); // react-hook-form에 저장
            } catch (error) {
              console.error('❌ JSON 파싱 에러:', error);
            }
          });

          return () => {
            console.log('🗑️ Tagify 인스턴스 제거됨');
            tagifyRef.current?.destroy();
          };
        }, []);

        return (
          <input
            ref={inputRef}
            defaultValue={JSON.stringify(value)}
            className="min-h-[44px] w-full rounded-lg border p-4 font-CAP1 text-CAP1 leading-CAP1 placeholder:text-light_gray"
            placeholder="태그 입력 (최대 5개)..."
          />
        );
      }}
    />
  );
}
