import { IMAGES } from '@assets/index';
import { PopUpFormData } from '@type/popUpSetting';

import { ChangeEvent, useRef, useState } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import ImageContainerComponent from './imageContainer';
import Image from 'next/image';

interface ImageUploadComponentProps {
  control: Control<PopUpFormData>;
  rules: UseControllerProps<PopUpFormData, 'imageList'>['rules'];
}

export default function ImageUploadComponent({ control, rules }: ImageUploadComponentProps) {
  const [files, setFiles] = useState<string[]>([]);

  // 이미지 첨부 버튼 클릭
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const fileInputSubmit = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void,
    value: File[],
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const targetFile = e.target.files[0];

    // 미리보기 url 생성
    const url = URL.createObjectURL(targetFile);
    setFiles((prev) => [...prev, url]);

    // react-hook-form에 연결
    const selectedFiles = Array.from(e.target.files);
    onChange([...value, ...selectedFiles]);
  };

  // 이미지 삭제
  const handleDeleteImage = (
    index: number,
    urlToDelete: string,
    onChange: (value: File[]) => void,
    value: File[],
  ) => {
    const updatedFiles = value.filter((_, i) => i !== index); // 필터링해서 제거
    onChange(updatedFiles);

    // 미리보기 URL 해제 (메모리 누수 방지)
    URL.revokeObjectURL(urlToDelete);

    // 미리보기 state에서도 제거
    setFiles((prev) => prev.filter((url) => url !== urlToDelete));
  };

  return (
    <Controller
      name="imageList"
      control={control}
      rules={rules}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
        <div className="relative flex w-full max-w-[400px] flex-row gap-[6px]">
          {/* image upload input */}
          <input
            ref={fileInputRef}
            id="fileInput"
            className="hidden"
            type="file"
            accept="images/*"
            onChange={(e) => fileInputSubmit(e, onChange, value)}
          />
          <div
            onClick={handleFileButtonClick}
            className="mt-1 flex size-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-light_gray"
          >
            <Image src={IMAGES.ImageUpload} alt="upload" />
            <div className="mt-0.5 flex flex-row gap-0.5 font-CAP2 text-CAP2 leading-CAP2">
              <p>
                <span className="text-purple">{files.length}</span> / 10
              </p>
            </div>
          </div>
          {/* upload image list */}
          <div className="flex flex-1 flex-row gap-[6px] overflow-auto pt-1">
            {files.length > 0 &&
              files.map((image, index) => (
                <ImageContainerComponent
                  key={index}
                  index={index}
                  url={image}
                  onDelete={() => handleDeleteImage(index, image, onChange, value)}
                />
              ))}
          </div>
          {error && <p className="absolute bottom-0 translate-y-full text-red">{error.message}</p>}
        </div>
      )}
    />
  );
}
