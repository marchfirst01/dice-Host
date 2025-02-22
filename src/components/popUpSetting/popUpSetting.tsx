import PopUpSettingLayout from '@layout/popUpSettingLayout';
import { PopUpFormData } from '@type/popUpSetting';
import formattedDiscountPrice from '@utils/formattedDiscountPrice';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CategoryDropdownComponent from './categoryDropdown';
import GeocodeModalComponent from './geocodeModal';
import ImageUploadComponent from './imageUpload';
import PopUpInputComponent from './popUpInput';
import PopUpTextareaComponent from './popUpTextarea';
import TagInputComponent from './tagInput';
import TimePickerComponents from './timePicker';
import { useRouter } from 'next/router';
import { fetchSpaceIdUpdate, fetchSpaceRegister } from 'src/api/popUpSetting';
import { popUpConfigList } from 'src/context/popUpSetting/popUpConfig';
import { getReverseGeocode } from 'src/server/naverMap';

export default function PopUpSettingComponent({
  id,
  isEditMode,
  editData,
}: {
  id?: string;
  isEditMode: boolean;
  editData: PopUpFormData;
}) {
  const router = useRouter();
  console.log(editData);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PopUpFormData>({
    defaultValues: { ...editData },
  });

  const { setSelectedAddress } = useGeocodeStore();

  const getAddressFromCoords = async () => {
    const response = await getReverseGeocode(editData.latitude, editData.longitude);

    const city = response.results[0].region.area1.name;
    const district = response.results[0].region.area2.name;
    const location = response.results[1].land.name;
    setValue('city', city);
    setValue('district', district);
    setValue('location', location);
    setSelectedAddress({
      roadAddress: `${city} ${district} ${location}`,
      postalCode: response.results[1].land.addition1.value,
    });
  };

  useEffect(() => {
    if (isEditMode) {
      getAddressFromCoords();
    }
  }, [editData]);

  const [geocodeModalOpen, setGeocodeModalOpen] = useState<boolean>(false);
  const { selectedAddress } = useGeocodeStore();

  // setDiscountType 임시 삭제 나중에 추가 ..
  const [discountType] = useState<'할인율' | '할인 금액'>('할인율');
  const watchDiscountFields = watch('discountRate');
  const watchPriceFields = watch('pricePerDay');

  // 가격 표시
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
  const onSubmit: SubmitHandler<PopUpFormData> = async (formData: PopUpFormData) => {
    console.log('submit form', formData);

    if (isEditMode && id) {
      try {
        console.log('edit mode');
        await fetchSpaceIdUpdate(id, formData);
        router.push(`popUp/${id}`);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      try {
        await fetchSpaceRegister(formData);
        router.push('/main');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PopUpSettingLayout handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <section className="flex flex-col gap-6 font-CAP1 text-CAP1 leading-CAP1">
        <p className="font-SUB1 text-SUB1 leading-SUB1">필수 정보 작성</p>
        {/* name - 공간 이름 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.name.display}
          </p>
          <PopUpInputComponent
            popUpConfig={popUpConfigList.name}
            control={control}
            rules={{ required: popUpConfigList.name.rules }}
          />
        </div>
        {/* description - 한 줄 소개 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.description.display}
          </p>
          <PopUpInputComponent
            popUpConfig={popUpConfigList.description}
            control={control}
            rules={{ required: popUpConfigList.description.rules }}
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* image - 이미지 */}
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          <ImageUploadComponent
            editImageUrls={editData.imageList as string[]}
            control={control}
            rules={{ required: '이미지를 하나 이상 등록해주세요' }}
          />
        </div>
        {/* category - 공간 타입 */}
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 유형</p>
          <CategoryDropdownComponent
            control={control}
            rules={{ required: '공간 유형을 선택해주세요' }}
          />
        </div>
        {/* openingTime, closingTime - 공간 영업 시간 */}
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 영업 시간</p>
          <div className="flex flex-row items-center gap-1">
            <TimePickerComponents
              type="openingTime"
              control={control}
              rules={{
                required: popUpConfigList.openingTime.rules,
              }}
            />{' '}
            ~{' '}
            <TimePickerComponents
              type="closingTime"
              control={control}
              rules={{
                required: popUpConfigList.closingTime.rules,
              }}
            />
          </div>
        </div>
        {/* capacity - 수용인원 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.capacity.display}
          </p>
          <PopUpInputComponent
            popUpConfig={popUpConfigList.capacity}
            control={control}
            rules={{ required: popUpConfigList.capacity.rules }}
          />
        </div>
        {/* tags - 해시태그 */}
        <div className="flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.tags.display}
          </p>
          <TagInputComponent control={control} />
        </div>
      </section>
      {/* pricePerDay & discountRate */}
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 대여 가격 작성</p>
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {popUpConfigList.pricePerDay.display}
            </p>
            <PopUpInputComponent
              popUpConfig={popUpConfigList.pricePerDay}
              control={control}
              rules={{ required: popUpConfigList.pricePerDay.rules }}
            />
          </div>
          <div className="flex w-full flex-row items-end gap-2 font-CAP1 text-CAP1 leading-CAP1">
            <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
              <p className="after:ml-1 after:text-red after:content-['*']">
                {popUpConfigList.discountRate.display}
              </p>
              <PopUpInputComponent
                popUpConfig={popUpConfigList.discountRate}
                control={control}
                rules={{ required: popUpConfigList.discountRate.rules }}
              />
            </div>
            <div className="h-11 w-[107px] rounded-lg border border-stroke py-3 text-center text-light_gray">
              할인율 (%)
            </div>
          </div>
          {watchDiscountFields && formattedPrice && (
            <div className="flex flex-row justify-end gap-2 font-SUB2 text-SUB2 leading-SUB2">
              <p className="text-red">{watchDiscountFields}% 할인</p>
              <p>{formattedPrice}원</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <p className="mb-6 font-SUB1 text-SUB1 leading-SUB1">공간 소개글 작성</p>
        {/* details - 자세한 소개 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.details.display}
          </p>
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.details}
            control={control}
            rules={{ required: popUpConfigList.details.rules }}
          />
        </div>
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
              setValue={setValue}
              rules={{ required: popUpConfigList.location.rules }}
            />
          </div>
          {selectedAddress.roadAddress && (
            <p className="my-1 flex h-[44px] w-full items-center rounded-lg border px-4 font-CAP1 text-CAP1 leading-CAP1">
              {selectedAddress.roadAddress}
            </p>
          )}
          <PopUpInputComponent popUpConfig={popUpConfigList.address} control={control} />
          {errors && <p className="text-red">{errors.location?.message}</p>}
        </div>
        {/* websiteUrl */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p>{popUpConfigList.websiteUrl.display}</p>
          <PopUpInputComponent popUpConfig={popUpConfigList.websiteUrl} control={control} />
        </div>
        {/* contactNumber - 문의 전화번호 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.contactNumber.display}
          </p>
          <PopUpInputComponent
            popUpConfig={popUpConfigList.contactNumber}
            control={control}
            rules={{ required: popUpConfigList.contactNumber.rules }}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <p className="font-SUB1 text-SUB1 leading-SUB1">시설 이용 및 공지사항 안내 작성</p>
        {/* facilityInfo - 시설 이용 및 공지사항 안내 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.facilityInfo.display}
          </p>
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.facilityInfo}
            control={control}
            rules={{ required: popUpConfigList.facilityInfo.rules }}
          />
        </div>
        {/* notice - 시설 이용 안내 */}
        <div className="flex w-full flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {popUpConfigList.notice.display}
          </p>
          <PopUpTextareaComponent
            popUpConfig={popUpConfigList.notice}
            control={control}
            rules={{ required: popUpConfigList.notice.rules }}
          />
        </div>
      </section>
    </PopUpSettingLayout>
  );
}
