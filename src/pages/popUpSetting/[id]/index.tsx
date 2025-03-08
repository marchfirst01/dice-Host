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

  return (
    <>
      {isFetching ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <Image src={IMAGES.DiceLoading} priority alt="loading" width={150} height={150} />
        </div>
      ) : (
        <PopUpSettingComponent id={id} isEditMode={isEditMode} editData={data} />
      )}
    </>
  );
}
