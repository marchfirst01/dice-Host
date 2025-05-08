import GeocodeModalComponent from '@components/space/setting/geocodeModal';
import PopUpSettingLayout from '@layout/popUpSettingLayout';
import { PopUpFormData } from '@type/popUpSetting';
import formatDiscountPrice from '@utils/formatDiscountPrice';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PopUpFormData>({
    defaultValues: editData,
  });

  const [isOn, setIsOn] = useState(editData.isActivated);
  useEffect(() => {
    setValue('isActivated', isOn);
    setIsOn(isOn);
  }, [isOn, setIsOn, setValue]);

  const { selectedAddress, setSelectedAddress } = useGeocodeStore();

  const getAddressFromCoords = useCallback(async () => {
    if (editData && isEditMode) {
      try {
        const response = await getReverseGeocode(editData.latitude, editData.longitude);
        const city = response.results[0].region.area1.name;
        const district = response.results[0].region.area2.name;
        const address = response.results[1].land.name;
        setValue('city', city);
        setValue('district', district);
        setValue('address', address);
        setSelectedAddress({
          roadAddress: `${city} ${district} ${address}`,
          postalCode: response.results[1].land.addition1.value,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isEditMode, editData, setSelectedAddress, setValue]);

  useEffect(() => {
    if (isEditMode) {
      getAddressFromCoords();
    } else {
      setSelectedAddress({
        jibunAddress: '',
        roadAddress: '',
        sido: '',
        sigugun: '',
        postalCode: '',
        latitude: 0,
        longitude: 0,
      });
    }
  }, [setSelectedAddress, getAddressFromCoords, isEditMode]);

  const [geocodeModalOpen, setGeocodeModalOpen] = useState<boolean>(false);

  // 폼 제출
  const onSubmit: SubmitHandler<PopUpFormData> = async (formData: PopUpFormData) => {
    if (isEditMode && id) {
      try {
        const res = await fetchSpaceIdUpdate(id, formData);
        if (res) {
          router.push(`/popUp/${id}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      try {
        await fetchSpaceRegister(formData);
        router.push('/space');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PopUpSettingLayout
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isOn={isOn}
      setIsOn={setIsOn}
    >
      {/* pricePerDay & discountRate */}
      <section className="text-style-CAP1 flex flex-col gap-6">
        <p className="text-style-SUB1">위치 안내 작성</p>
        <div className="relative w-full">
          <p className="after:ml-1 after:text-red after:content-['*']">위치</p>
          <div className="mb-1 mt-2 flex flex-row">
            <p
              className={`text-style-CAP1 flex h-[44px] w-full items-center rounded-lg border px-4 ${selectedAddress.postalCode ? 'text-black' : 'text-light_gray'}`}
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
              rules={{ required: popUpConfigList.address.rules }}
            />
          </div>
          {selectedAddress.roadAddress && (
            <p className="text-style-CAP1 my-1 flex h-[44px] w-full items-center rounded-lg border px-4">
              {selectedAddress.roadAddress}
            </p>
          )}
          <PopUpInputComponent popUpConfig={popUpConfigList.detailAddress} control={control} />
          {errors.detailAddress && <p className="text-red">{errors.detailAddress.message}</p>}
        </div>
      </section>
    </PopUpSettingLayout>
  );
}
