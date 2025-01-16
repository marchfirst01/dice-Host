import React from 'react';

import { useRouter } from 'next/router';

const PopUpDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>PopUpDetailPage id: {id}</div>;
};

export default PopUpDetailPage;
