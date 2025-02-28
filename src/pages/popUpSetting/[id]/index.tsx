import { IMAGES } from '@assets/index';
import PopUpSettingComponent from '@components/popUpSetting/popUpSetting';
import { usePopUpId } from '@hooks/usePopUp';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PopUpSettingPage() {
  const router = useRouter();
  const { mode, id } = router.query as { mode: string; id: string };
  const isEditMode = mode === 'edit';

  const { data, isFetching } = usePopUpId(id);
  console.log(data);

  return (
    <>
      {isFetching ? (
        <div className="h-full">
          <Image src={IMAGES.DiceLoading} alt="loading" />
        </div>
      ) : (
        <PopUpSettingComponent id={id} isEditMode={isEditMode} editData={data} />
      )}
    </>
  );
}
