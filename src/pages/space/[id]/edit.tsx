// [id] 공간 수정
import SpaceSettingComponent from '@components/space/setting';

import React from 'react';

import { useRouter } from 'next/router';

export default function EditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <SpaceSettingComponent id={id} />
    </div>
  );
}
