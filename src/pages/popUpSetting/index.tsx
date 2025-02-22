import { IMAGES } from '@assets/index';
import PopUpSettingComponent from '@components/popUpSetting/popUpSetting';
import { usePopUpId } from '@hooks/usePopUp';
import { PopUpFormData } from '@type/popUpSetting';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpSettingPage() {
  const router = useRouter();
  const { mode, id } = router.query as { mode: string; id: string };
  const isEditMode = mode === 'edit';

  const { data, isFetching } = usePopUpId(id!);

  const initialData: PopUpFormData = {
    name: '',
    description: '',
    imageList: [],
    category: '',
    openingTime: '',
    closingTime: '',
    capacity: 0,
    tags: [],
    pricePerDay: '0',
    discountRate: '0',
    details: '',
    latitude: 0,
    longitude: 0,
    city: '',
    district: '',
    location: '',
    address: '',
    websiteUrl: '',
    contactNumber: '',
    facilityInfo: '',
    notice: '',
  };
  return id ? (
    <>
      {isFetching ? (
        <div className="h-full">
          <Image src={IMAGES.DiceLoading} alt="loading" />
        </div>
      ) : (
        <PopUpSettingComponent id={id} isEditMode={isEditMode} editData={data} />
      )}
    </>
  ) : (
    <PopUpSettingComponent isEditMode={isEditMode} editData={initialData} />
  );
}
