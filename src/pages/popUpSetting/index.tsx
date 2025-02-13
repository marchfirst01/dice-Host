import CategoryDropdownComponent from '@components/popUpSetting/categoryDropdown';
import DiscountInputComponent from '@components/popUpSetting/discountInput';
import GeocodeModalComponent from '@components/popUpSetting/geocodeModal';
import ImageUploadComponent from '@components/popUpSetting/imageUpload';
import PopUpInputComponent from '@components/popUpSetting/popUpInput';
import PopUpTextareaComponent from '@components/popUpSetting/popUpTextarea';
import PriceInputComponents from '@components/popUpSetting/priceInput';
import TimePickerComponents from '@components/popUpSetting/timePicker';
import PopUpSettingLayout from '@layout/popUpSettingLayout';
import { PopUpFormData, PopUpId } from '@type/popUpSetting';
import { PopUpRegisterResponse } from '@type/popUpSetting/popUpResponse';
import formattedDiscountPrice from '@utils/formattedDiscountPrice';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchImageUpload, fetchSpaceRegister } from 'src/api/popUpSetting';
import { popUpConfigList } from 'src/context/popUpSetting/popUpConfig';

export default function PopUpSettingPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PopUpFormData>();

  const [geocodeModalOpen, setGeocodeModalOpen] = useState<boolean>(false);
  const { selectedAddress } = useGeocodeStore();

  const [discountType, setDiscountType] = useState<'할인율' | '할인 금액'>('할인율');
  const watchDiscountFields = watch('discountRate');
  const watchPriceFields = watch('pricePerDay');

  // 가격 표시
  const [formattedPrice, setFormattedPrice] = useState<string>();
  useEffect(() => {
    if (watchDiscountFields && watchPriceFields) {
      const returnValue = formattedDiscountPrice({
        discount: watchDiscountFields.price,
        price: watchPriceFields,
        discountType,
      });
      const formattedReturnValue = returnValue.toLocaleString();
      setFormattedPrice(formattedReturnValue);
    }
  }, [watchDiscountFields, watchPriceFields, formattedPrice]);

  // 폼 제출
  const onSubmit: SubmitHandler<PopUpFormData> = async (formData: PopUpFormData) => {
    const {
      name,
      description,
      imageList,
      category,
      openingTime,
      closingTime,
      capacity,
      // tags,
      pricePerDay,
      discountRate,
      details,
      location,
      address,
      websiteUrl,
      contactNumber,
      facilityInfo,
      notice,
    } = formData;

    // imageList -> imageUrls
    try {
      const imageRes = await fetchImageUpload(imageList);
      console.log(imageRes);
    } catch (error) {
      console.log(error);
    }

    const registerData: PopUpRegisterResponse = {
      name,
      description,
      category,
      // TODO
      openingTime: '09:00',
      closingTime: '10:00',

      capacity: Number(capacity),
      pricePerDay: Number(pricePerDay.replace(/,/g, '')),
      discountRate: discountRate.price,
      details,
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.sido,
      district: location.sigugun,
      address,
      websiteUrl,
      contactNumber,
      facilityInfo,
      notice,
      // TODO: 임시
      imageUrls: ['www.example.com'],
      tags: ['카페'],
    };
    // const res = await fetchSpaceRegister(registerData);
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
          <PopUpInputComponent
            popUpConfig={popUpConfigList.name}
            control={control}
            rules={{ required: popUpConfigList.name.rules }}
          />
        </DivLayout>
        <DivLayout name="description">
          <PopUpInputComponent
            popUpConfig={popUpConfigList.description}
            control={control}
            rules={{ required: popUpConfigList.description.rules }}
          />
        </DivLayout>
        <div className="flex flex-col gap-1">
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          <ImageUploadComponent
            control={control}
            rules={{ required: '이미지를 하나 이상 등록해주세요' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 유형</p>
          <CategoryDropdownComponent
            control={control}
            rules={{ required: '공간 유형을 선택해주세요' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 영업 시간</p>
          <div className="flex flex-row items-center gap-1">
            <TimePickerComponents
              type="openingTime"
              control={control}
              rules={{
                required: popUpConfigList.openingTime.rules,
                validate: {
                  allFieldsSelected: (value) => {
                    if (!value?.period || !value?.hours || !value?.minutes) {
                      return popUpConfigList.openingTime.rules;
                    }
                    return true;
                  },
                },
              }}
            />{' '}
            ~{' '}
            <TimePickerComponents
              type="closingTime"
              control={control}
              rules={{
                required: popUpConfigList.closingTime.rules,
                validate: {
                  allFieldsSelected: (value) => {
                    if (!value?.period || !value?.hours || !value?.minutes) {
                      return popUpConfigList.closingTime.rules;
                    }
                    return true;
                  },
                },
              }}
            />
          </div>
        </div>
        <DivLayout name="capacity">
          <PopUpInputComponent
            popUpConfig={popUpConfigList.capacity}
            control={control}
            rules={{ required: popUpConfigList.capacity.rules }}
          />
        </DivLayout>
        <DivLayout name="tags">
          <PopUpInputComponent
            popUpConfig={popUpConfigList.tags}
            control={control}
            rules={{ required: popUpConfigList.tags.rules }}
          />
        </DivLayout>
      </section>
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 대여 가격 작성</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {popUpConfigList.pricePerDay.display}
            </p>
            <PriceInputComponents
              popUpConfig={popUpConfigList.pricePerDay}
              control={control}
              rules={{ required: popUpConfigList.pricePerDay.rules }}
            />
          </div>
          <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {popUpConfigList.discountRate.display}
            </p>
            <DiscountInputComponent
              control={control}
              discountType={discountType}
              setDiscountType={setDiscountType}
              rules={{ required: popUpConfigList.discountRate.rules }}
            />
          </div>
          {watchDiscountFields && formattedPrice && (
            <div className="flex flex-row justify-end gap-2 font-SUB2 text-SUB2 leading-SUB2">
              <p className="text-red">
                {watchDiscountFields.price}
                {discountType === '할인율' ? '%' : '원'} 할인
              </p>
              <p>{formattedPrice}원</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 소개글 작성</p>
        <DivLayout name="details">
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.details}
            control={control}
            rules={{ required: popUpConfigList.details.rules }}
          />
        </DivLayout>
      </section>
      <section className="flex flex-col gap-6 font-CAP1 text-CAP1 leading-CAP1">
        <p className="font-SUB1 text-SUB1 leading-SUB1">위치 안내 작성</p>
        <div className="relative w-full">
          <p className="after:ml-1 after:text-red after:content-['*']">위치</p>
          <div className="mb-1 mt-2 flex flex-row">
            <p
              className={`flex h-[44px] w-full items-center rounded-lg border px-4 font-CAP1 text-CAP1 leading-CAP1 ${selectedAddress.postalCode ? 'text-black' : 'text-light_gray'}`}
            >
              {selectedAddress.postalCode
                ? selectedAddress.postalCode
                : '팝업 공간 주소를 검색해주세요'}
            </p>
            <button
              onClick={() => setGeocodeModalOpen(!geocodeModalOpen)}
              className={`ml-2 text-nowrap rounded-lg px-[27.5px] py-[11.5px] text-white ${geocodeModalOpen ? 'bg-black' : 'bg-light_gray'}`}
            >
              주소 검색
            </button>
          </div>
          <div className={`${geocodeModalOpen ? '' : 'hidden'}`}>
            <GeocodeModalComponent
              setGeocodeModalOpen={setGeocodeModalOpen}
              control={control}
              rules={{ required: popUpConfigList.location.rules }}
            />
          </div>
          {selectedAddress.jibunAddress && (
            <p className="my-1 flex h-[44px] w-full items-center rounded-lg border px-4 font-CAP1 text-CAP1 leading-CAP1">
              {selectedAddress.jibunAddress}
            </p>
          )}
          <PopUpInputComponent popUpConfig={popUpConfigList.address} control={control} />
          {errors && <p className="text-red">{errors.location?.message}</p>}
        </div>
        <DivLayout name="websiteUrl" required={false}>
          <PopUpInputComponent popUpConfig={popUpConfigList.websiteUrl} control={control} />
        </DivLayout>
        <DivLayout name="contactNumber">
          <PopUpInputComponent
            popUpConfig={popUpConfigList.contactNumber}
            control={control}
            rules={{ required: popUpConfigList.contactNumber.rules }}
          />
        </DivLayout>
      </section>
      <section className="flex flex-col gap-6">
        <p className="font-SUB1 text-SUB1 leading-SUB1">시설 이용 및 공지사항 안내 작성</p>
        <DivLayout name="facilityInfo">
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.facilityInfo}
            control={control}
            rules={{ required: popUpConfigList.facilityInfo.rules }}
          />
        </DivLayout>
        <DivLayout name="notice">
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.notice}
            control={control}
            rules={{ required: popUpConfigList.notice.rules }}
          />
        </DivLayout>
      </section>
    </PopUpSettingLayout>
  );
}
