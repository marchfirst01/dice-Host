import { IMAGES } from '@assets/index';

import React from 'react';

import Image from 'next/image';

const ImagePage = () => {
  return (
    <div>
      <p>이미지 확인 용 임시 페이지</p>
      <Image src={IMAGES.Close} alt="close" />
    </div>
  );
};

export default ImagePage;
