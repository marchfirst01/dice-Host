import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

function MySpaceItemComponent({ imageUrl, id }: { imageUrl: string; id: number }) {
  const router = useRouter();
  return (
    <div className="flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-back_gray">
      <Image
        onClick={() => router.push(`popUp/${id}`)}
        className="object-contain"
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
        <MySpaceItemComponent imageUrl={space.imageUrl} id={space.id} />
      ))}
    </div>
  );
}
