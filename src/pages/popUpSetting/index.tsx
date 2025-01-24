import DiscountInputComponent from '@components/popUpSetting/discountInput';
import ImageUploadComponent from '@components/popUpSetting/imageUpload';
import PlaceTypeDropdownComponent from '@components/popUpSetting/placeTypeDropdown';
import PopUpInputComponent from '@components/popUpSetting/popUpInput';
import PopUpTextareaComponent from '@components/popUpSetting/popUpTextarea';
import PriceInputComponents from '@components/popUpSetting/priceInput';
import PopUpSettingLayout from '@layout/popUpSettingLayout';
import formattedDiscountPrice from '@lib/utils/formattedDiscountPrice';
import { PopUpFormData, PopUpId } from '@type/popUpSetting';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  interface DivLayoutProps {
    name: PopUpId;
    required?: boolean;
    children: React.ReactNode;
  }

  const DivLayout = ({ name, required = true, children }: DivLayoutProps) => {
    return (
      <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
        <p className={`${required && "after:ml-1 after:text-red after:content-['*']"}`}>
          {popUpConfigList[name].display}
        </p>
        {children}
      </div>
    );
  };

  return (
    <PopUpSettingLayout handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <section className="flex flex-col gap-6 font-CAP1 text-CAP1 leading-CAP1">
        <p className="font-SUB1 text-SUB1 leading-SUB1">필수 정보 작성</p>
        <DivLayout name="name">
          <PopUpInputComponent popUpConfig={popUpConfigList.name} control={control} />
        </DivLayout>
        <DivLayout name="subTitle">
          <PopUpInputComponent popUpConfig={popUpConfigList.subTitle} control={control} />
        </DivLayout>
        <div className="flex flex-col gap-1">
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          <ImageUploadComponent control={control} />
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
        <DivLayout name="numOfPeople">
          <PopUpInputComponent popUpConfig={popUpConfigList.numOfPeople} control={control} />
        </DivLayout>
        <DivLayout name="hashTagList">
          <PopUpInputComponent popUpConfig={popUpConfigList.hashTagList} control={control} />
        </DivLayout>
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
        <DivLayout name="description">
          <PopUpTextareaComponent popUpConfig={popUpConfigList.description} control={control} />
        </DivLayout>
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
        <DivLayout name="homepage" required={false}>
          <PopUpInputComponent popUpConfig={popUpConfigList.homepage} control={control} />
        </DivLayout>
        <DivLayout name="phoneNumber">
          <PopUpInputComponent popUpConfig={popUpConfigList.phoneNumber} control={control} />
        </DivLayout>
      </section>
      <section className="flex flex-col gap-6">
        <p className="font-SUB1 text-SUB1 leading-SUB1">시설 이용 및 공지사항 안내 작성</p>
        <DivLayout name="usageInformation">
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.usageInformation}
            control={control}
          />
        </DivLayout>
        <DivLayout name="noticeInformation">
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.noticeInformation}
            control={control}
          />
        </DivLayout>
      </section>
    </PopUpSettingLayout>
  );
}
