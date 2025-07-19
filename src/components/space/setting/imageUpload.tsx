import { IMAGES } from '@assets/index';
import { SpaceFormData } from '@type/space/spaceType';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, UseControllerProps, useWatch } from 'react-hook-form';

import ImageContainerComponent from './imageContainer';
import Image from 'next/image';

// 이미지 아이템 타입 정의
type ImageItem = File | string;

// 이미지 업로드가 가능한 필드들만 명시
type ImageFieldNames = 'imageList' | 'popUpImageList';

interface ImageUploadComponentProps {
  control: Control<SpaceFormData>;
  name: ImageFieldNames;
  rules?: UseControllerProps<SpaceFormData, ImageFieldNames>['rules'];
}

// 타입 가드 함수들
const isFile = (item: unknown): item is File => {
  return item instanceof File;
};

const isString = (item: unknown): item is string => {
  return typeof item === 'string';
};

export default function ImageUploadComponent({ control, name, rules }: ImageUploadComponentProps) {
  // URL 미리보기 상태 관리
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 이전 value 값을 저장하기 위한 ref
  const prevValueRef = useRef<ImageItem[]>([]);

  // useWatch로 현재 필드 값을 감지
  const watchedValue = useWatch({
    control,
    name,
    defaultValue: [],
  }) as ImageItem[];

  // useEffect를 컴포넌트 최상위로 이동
  useEffect(() => {
    // value를 ImageItem[]로 타입 단언
    const imageValue: ImageItem[] = watchedValue || [];

    // 이전 value와 현재 value를 비교하여 변경 사항이 없으면 반환
    const isSameValue =
      prevValueRef.current.length === imageValue.length &&
      prevValueRef.current.every((item, idx) => item === imageValue[idx]);

    if (isSameValue) return;

    // 현재 value 저장
    prevValueRef.current = imageValue;

    // value가 비어있는 경우 미리보기도 비우기
    if (!imageValue || imageValue.length === 0) {
      // 기존 blob URL 해제
      previewUrls.forEach((url) => {
        if (url?.startsWith?.('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      setPreviewUrls([]);
      return;
    }

    // 현재 값에서 미리보기 URL 생성
    const urls = imageValue
      .map((item) => {
        if (isString(item)) {
          return item; // 이미 문자열인 경우 그대로 사용
        } else if (isFile(item)) {
          // 이미 존재하는 미리보기 URL을 재사용하거나 새로 생성
          const existingUrlIndex = prevValueRef.current.findIndex((prevItem) => prevItem === item);

          if (existingUrlIndex !== -1 && existingUrlIndex < previewUrls.length) {
            return previewUrls[existingUrlIndex];
          }

          return URL.createObjectURL(item);
        }
        return ''; // 기본값
      })
      .filter(Boolean); // 빈 문자열 제거

    // 이전 URL 목록과 새로운 URL 목록 비교하여 필요한 경우에만 업데이트
    const needsUpdate =
      urls.length !== previewUrls.length || urls.some((url, idx) => url !== previewUrls[idx]);

    if (needsUpdate) {
      // 미리보기 URL 업데이트
      setPreviewUrls(urls);
    }

    // 정리 함수
    return () => {
      // 컴포넌트 언마운트 또는 value 변경 시 사용하지 않는 blob URL 해제
      previewUrls.forEach((url) => {
        if (url?.startsWith?.('blob:') && !urls.includes(url)) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [watchedValue, previewUrls]);

  // 이미지 첨부 버튼 클릭
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 처리
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: ImageItem[]) => void,
    currentValue: ImageItem[],
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);

    // 미리보기 URL 생성 및 저장
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    // react-hook-form에 값 업데이트
    const updatedValue = [...currentValue, ...newFiles];
    onChange(updatedValue);
    prevValueRef.current = updatedValue;
  };

  // 이미지 삭제
  const handleDeleteImage = (
    index: number,
    onChange: (value: ImageItem[]) => void,
    currentValue: ImageItem[],
  ) => {
    // 미리보기에서 해당 URL 제거
    const removedPreviewUrl = previewUrls[index];
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));

    // 메모리 누수 방지를 위해 URL 해제 (blob URL인 경우만)
    if (removedPreviewUrl?.startsWith?.('blob:')) {
      URL.revokeObjectURL(removedPreviewUrl);
    }

    // 폼 값에서도 해당 항목 제거
    const updatedValue = [...currentValue];
    updatedValue.splice(index, 1);
    onChange(updatedValue);
    prevValueRef.current = updatedValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        return (
          <div className="relative flex w-full max-w-[400px] flex-row gap-[6px]">
            {/* 파일 입력 필드 */}
            <input
              ref={fileInputRef}
              id={`fileInput-${name}`}
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                handleFileChange(e, onChange as (value: ImageItem[]) => void, value as ImageItem[])
              }
            />

            {/* 업로드 버튼 */}
            <div
              onClick={handleFileButtonClick}
              className="mt-1 flex size-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-light_gray"
            >
              <Image src={IMAGES.ImageUpload} alt="upload" />
              <div className="text-style-CAP2 mt-0.5 flex flex-row gap-0.5">
                <p>
                  <span className="text-purple">{previewUrls.length}</span> / 10
                </p>
              </div>
            </div>

            {/* 이미지 미리보기 목록 */}
            <div className="flex flex-1 flex-row gap-[6px] overflow-auto pt-1">
              {previewUrls.length > 0 &&
                previewUrls.map((url, index) => (
                  <ImageContainerComponent
                    key={`${index}-${url.slice(-8)}`}
                    index={index}
                    url={url}
                    onDelete={() =>
                      handleDeleteImage(
                        index,
                        onChange as (value: ImageItem[]) => void,
                        value as ImageItem[],
                      )
                    }
                    hasMain={name === 'imageList'}
                  />
                ))}
            </div>

            {/* 오류 메시지 */}
            {error && (
              <p className="absolute bottom-0 translate-y-full text-red">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
