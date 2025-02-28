import PopUpSettingComponent from '@components/popUpSetting/popUpSetting';
import { PopUpFormData } from '@type/popUpSetting';

import React from 'react';

import { useRouter } from 'next/router';

export default function PopUpSettingPage() {
  const router = useRouter();
  const { mode } = router.query as { mode: string };
  const isEditMode = mode === 'edit';

  const initialData: PopUpFormData = {
    name: '',
    description: '',
    imageList: [],
    category: '',
    openingTime: '',
    closingTime: '',
    size: null,
    capacity: null,
    tags: [],
    pricePerDay: null,
    discountRate: null,
    details: '',
    latitude: 0,
    longitude: 0,
    city: '',
    district: '',
    address: '',
    detailAddress: '',
    websiteUrl: '',
    contactNumber: '',
    facilityInfo: '',
    notice: '',
    isActivated: false,
  };

  return <PopUpSettingComponent isEditMode={isEditMode} editData={initialData} />;
}
