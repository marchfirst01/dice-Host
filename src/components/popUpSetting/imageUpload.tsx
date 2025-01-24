import { IMAGES } from '@assets/index';
import { PopUpFormData } from '@type/popUpSetting';

import { ChangeEvent, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';

import ImageContainerComponent from './imageContainer';
import Image from 'next/image';

interface ImageUploadComponentProps {
  control: Control<PopUpFormData>;
}

export default function ImageUploadComponent({ control }: ImageUploadComponentProps) {
  // 이미지 첨부 버튼 클릭
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const fileInputSubmit = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string[]) => void,
    value: string[],
  ) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) return;

    const url = URL.createObjectURL(targetFile);
    onChange([...value, url]);
  };

  // 이미지 삭제
  const handleDeleteImage = (
    urlToDelete: string,
    onChange: (value: string[]) => void,
    value: string[],
  ) => {
    onChange(value.filter((url) => url !== urlToDelete));
    URL.revokeObjectURL(urlToDelete);
  };

  return (
    <Controller
      name="imageList"
      control={control}
      render={({ field: { onChange, value = [] } }) => (
        <div className="flex w-full max-w-[400px] flex-row gap-[6px]">
          {/* image upload input */}
          <input
            ref={fileInputRef}
            id="fileInput"
            className="hidden"
            type="file"
            accept=".jpg, .png, .svg"
            onChange={(e) => fileInputSubmit(e, onChange, value)}
          />
          <div
            onClick={handleFileButtonClick}
            className="mt-1 flex size-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-light_gray"
          >
            <Image src={IMAGES.ImageUpload} alt="upload" />
            <div className="mt-0.5 flex flex-row gap-0.5 font-CAP2 text-CAP2 leading-CAP2">
              <p>
                <span className="text-purple">{value.length}</span> / 10
              </p>
            </div>
          </div>
          {/* upload image list */}
          <div className="flex flex-1 flex-row gap-[6px] overflow-auto pt-1">
            {value.length > 0 &&
              value.map((image, index) => (
                <ImageContainerComponent
                  key={index}
                  index={index}
                  url={image}
                  onDelete={() => handleDeleteImage(image, onChange, value)}
                />
              ))}
          </div>
        </div>
      )}
    />
  );
}
