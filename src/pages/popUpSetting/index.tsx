import Upload from '@assets/newPopUp/upload.svg';
import DiscountInputComponent from '@components/popUpSetting/discountInput';
import ImageContainerComponent from '@components/popUpSetting/imageContainer';
import PlaceTypeDropdownComponent from '@components/popUpSetting/placeTypeDropdown';
import PopUpInputComponent from '@components/popUpSetting/popUpInput';
import PopUpTextareaComponent from '@components/popUpSetting/popUpTextarea';
import PriceInputComponents from '@components/popUpSetting/priceInput';
import NewPopUpLayout from '@layout/popUpSettingLayout';
import formattedDiscountPrice from '@lib/utils/formattedDiscountPrice';
import { PopUpFormData, PopUpId } from '@type/popUpSetting';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { popUpConfigList } from 'src/context/popUpSetting/popUpConfig';

export default function PopUpSettingPage() {
  const { control, handleSubmit, watch } = useForm<PopUpFormData>();
  const [discountType, setDiscountType] = useState<'할인율' | '할인 금액'>('할인율');

  const watchDiscountFields = watch('discount');
  const watchPriceFields = watch('price');

  const [formattedPrice, setFormattedPrice] = useState<string>();
  useEffect(() => {
    if (watchDiscountFields && watchPriceFields) {
      const returnValue = formattedDiscountPrice({
        discount: watchDiscountFields,
        price: watchPriceFields,
        discountType,
      });
      const formattedReturnValue = returnValue.toLocaleString();
      setFormattedPrice(formattedReturnValue);
    }
  }, [watchDiscountFields, watchPriceFields, formattedPrice]);

  // 폼 제출
  const onSubmit: SubmitHandler<PopUpFormData> = (formData: PopUpFormData) => {
    console.log(formData);
  };

  // 이미지 첨부 버튼 클릭
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  // 사진 파일 첨부 후 전송
  const [imageList, setImageList] = useState<string[]>([]);
  const fileInputSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];

    if (!targetFile) return;

    const url = URL.createObjectURL(targetFile);
    setImageList((prev) => [...prev, url]);
  };

  // 이미지 삭제
  const handleDeleteImage = (urlToDelete: string) => {
    setImageList((prev) => prev.filter((url) => url !== urlToDelete));
    URL.revokeObjectURL(urlToDelete);
  };

  const InputDiv = (name: PopUpId, required: boolean = true) => (
    <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
      <p className={`${required && "after:ml-1 after:text-red after:content-['*']"}`}>
        {popUpConfigList[name].display}
      </p>
      <PopUpInputComponent popUpConfig={popUpConfigList[name]} control={control} />
    </div>
  );

  const TextareaDiv = (name: PopUpId) => (
    <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
      <p className="after:ml-1 after:text-red after:content-['*']">
        {popUpConfigList[name].display}
      </p>
      <PopUpTextareaComponent popUpConfig={popUpConfigList[name]} control={control} />
    </div>
  );

  return (
    <NewPopUpLayout handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <section className="flex flex-col gap-6 font-CAP1 text-CAP1 leading-CAP1">
        <p className="font-SUB1 text-SUB1 leading-SUB1">필수 정보 작성</p>
        {InputDiv('name')}
        {InputDiv('subTitle')}
        <div className="flex flex-col gap-1">
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          {/* 이미지 등록 컴포넌트 구현 필요 */}
          <div className="flex w-full max-w-[400px] flex-row gap-[6px]">
            {/* image upload input */}
            <input
              ref={fileInputRef}
              id="fileInput"
              className="hidden"
              type="file"
              accept=".jpg, .png, .svg"
              onChange={fileInputSubmit}
            />
            <div
              onClick={handleFileButtonClick}
              className="mt-1 flex size-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-light_gray"
            >
              <Image src={Upload} alt="upload" />
              <div className="mt-0.5 flex flex-row gap-0.5 font-CAP2 text-CAP2 leading-CAP2">
                <p>
                  <span className="text-purple">{imageList.length}</span> / 10
                </p>
              </div>
            </div>
            {/* upload image list */}
            <div className="flex flex-1 flex-row gap-[6px] overflow-auto pt-1">
              {imageList.length > 0 &&
                imageList.map((image, index) => (
                  <ImageContainerComponent
                    key={index}
                    index={index}
                    url={image}
                    onDelete={() => handleDeleteImage(image)}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 유형</p>
          <PlaceTypeDropdownComponent control={control} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 영업 시간</p>
          <div className="flex flex-row items-center gap-1">
            <PopUpInputComponent popUpConfig={popUpConfigList.placeStart} control={control} />
            ~<PopUpInputComponent popUpConfig={popUpConfigList.placeEnd} control={control} />
          </div>
        </div>
        {InputDiv('numOfPeople')}
        {InputDiv('hashTagList')}
      </section>
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 대여 가격 작성</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {popUpConfigList.price.display}
            </p>
            <PriceInputComponents popUpConfig={popUpConfigList.price} control={control} />
          </div>
          <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {popUpConfigList.discount.display}
            </p>
            <DiscountInputComponent
              control={control}
              discountType={discountType}
              setDiscountType={setDiscountType}
            />
          </div>
          {watchDiscountFields && formattedPrice && (
            <div className="flex flex-row justify-end gap-2 font-SUB2 text-SUB2 leading-SUB2">
              <p className="text-red">
                {watchDiscountFields}
                {discountType === '할인율' ? '%' : '원'} 할인
              </p>
              <p>{formattedPrice}원</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 소개글 작성</p>
        {TextareaDiv('description')}
      </section>
      <section className="flex flex-col gap-6 font-CAP1 text-CAP1 leading-CAP1">
        <p className="font-SUB1 text-SUB1 leading-SUB1">위치 안내 작성</p>
        <div>
          <p className="after:ml-1 after:text-red after:content-['*']">위치</p>
          <div className="mb-1 mt-2 flex flex-row">
            <PopUpInputComponent popUpConfig={popUpConfigList.location} control={control} />
            <button
              onClick={() => console.log('api 연결하기')}
              className="ml-2 text-nowrap rounded-lg bg-light_gray px-[27.5px] py-[11.5px] text-white"
            >
              주소 검색
            </button>
          </div>
          <PopUpInputComponent
            popUpConfig={popUpConfigList.locationDescription}
            control={control}
          />
        </div>
        {InputDiv('homepage', false)}
        {InputDiv('phoneNumber')}
      </section>
      <section className="flex flex-col gap-6">
        <p className="font-SUB1 text-SUB1 leading-SUB1">시설 이용 및 공지사항 안내 작성</p>
        {TextareaDiv('usageInformation')}
        {TextareaDiv('noticeInformation')}
      </section>
    </NewPopUpLayout>
  );
}
