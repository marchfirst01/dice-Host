import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

function MySpaceItemComponent({ imageUrl, id }: { imageUrl: string; id: number }) {
  const router = useRouter();
  return (
    <div className="flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl">
      <Image
        onClick={() => router.push(`popUp/${id}`)}
        className="object-fit size-full"
        src={imageUrl}
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
