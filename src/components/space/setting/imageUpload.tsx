import { IMAGES } from '@assets/index';
import { SpaceFormData } from '@type/space/spaceType';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import ImageContainerComponent from './imageContainer';
import Image from 'next/image';

interface ImageUploadComponentProps {
  control: Control<SpaceFormData>;
  rules: UseControllerProps<SpaceFormData, 'imageList'>['rules'];
}

export default function ImageUploadComponent({ control, rules }: ImageUploadComponentProps) {
  // URL 미리보기 상태 관리
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 첨부 버튼 클릭
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 처리
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: (File | string)[]) => void,
    currentValue: (File | string)[],
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);

    // 미리보기 URL 생성 및 저장
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    // react-hook-form에 값 업데이트
    onChange([...currentValue, ...newFiles]);
  };

  // 이미지 삭제
  const handleDeleteImage = (
    index: number,
    onChange: (value: (File | string)[]) => void,
    currentValue: (File | string)[],
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
  };

  return (
    <Controller
      name="imageList"
      control={control}
      rules={rules}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        // value가 변경될 때 미리보기 URL 업데이트
        useEffect(() => {
          // value가 비어있는 경우 미리보기도 비우기
          if (!value || value.length === 0) {
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
          const urls = value
            .map((item) => {
              if (typeof item === 'string') {
                return item; // 이미 문자열인 경우 그대로 사용
              } else if (item instanceof File) {
                // File 객체인 경우 미리보기 URL 생성
                // 이미 해당 파일에 대한 URL이 있는지 확인
                const existingBlobUrl = previewUrls.find(
                  (url) =>
                    url.startsWith('blob:') && previewUrls.indexOf(url) === value.indexOf(item),
                );

                if (existingBlobUrl) {
                  return existingBlobUrl;
                }

                return URL.createObjectURL(item);
              }
              return ''; // 기본값
            })
            .filter(Boolean); // 빈 문자열 제거

          // 미리보기 URL 업데이트
          setPreviewUrls(urls);

          // 정리 함수
          return () => {
            // 컴포넌트 언마운트 또는 value 변경 시 사용하지 않는 blob URL 해제
            previewUrls.forEach((url) => {
              if (url?.startsWith?.('blob:') && !urls.includes(url)) {
                URL.revokeObjectURL(url);
              }
            });
          };
        }, [value]);

        return (
          <div className="relative flex w-full max-w-[400px] flex-row gap-[6px]">
            {/* 파일 입력 필드 */}
            <input
              ref={fileInputRef}
              id="fileInput"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, onChange, value)}
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
                    onDelete={() => handleDeleteImage(index, onChange, value)}
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
