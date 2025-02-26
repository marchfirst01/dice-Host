import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

function MySpaceItemComponent({ imageUrl, id }: { imageUrl: string; id: number }) {
  const router = useRouter();
  const image = imageUrl === 'www.example.com' ? 'https://placehold.co/600x400/png' : imageUrl;
  return (
    <div className="flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-back_gray">
      <Image
        onClick={() => router.push(`popUp/${id}`)}
        className="object-contain"
        src={image}
        alt="spaceItem"
        width={80}
        height={80}
      />
    </div>
  );
}

export default function MySpaceListComponent({
  mySpaceList,
}: {
  mySpaceList: { imageUrl: string; id: number }[];
}) {
  return (
    <div className="flex flex-row gap-1 overflow-x-scroll">
      {mySpaceList.map((space) => (
        <MySpaceItemComponent key={space.id} imageUrl={space.imageUrl} id={space.id} />
      ))}
    </div>
  );
}
