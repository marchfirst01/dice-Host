import { IMAGES } from '@assets/index';
import { useMessageHostList } from '@hooks/useChat';
import { formatMessageListTimestamp } from '@utils/formatMessageTimeStamp';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ChatPage() {
  const router = useRouter();
  const { data } = useMessageHostList();

  console.log(data);

  return (
    <div>
      <header className="flex h-12 w-full flex-row px-5">
        <Image
          onClick={() => router.back()}
          className="cursor-pointer"
          src={IMAGES.ArrowBackBlack}
          alt="back"
        />
      </header>
      <main className="px-5">
        <h1 className="flex flex-row gap-2 pb-6 pt-8 font-H1 text-H1 leading-H1">
          <p>게스트와의 쪽지함</p>
          <Image src={IMAGES.ChatBlack} alt="chat" />
        </h1>
        <section className="flex flex-col gap-3">
          {data ? (
            data.map((chat) => (
              <div
                onClick={() =>
                  router.push({
                    pathname: `/chat/${chat.id}`,
                    query: { spaceName: chat.spaceName },
                  })
                }
                className="flex w-full cursor-pointer flex-row py-[13px]"
              >
                <div className="relative size-[54px] overflow-hidden rounded-full">
                  <Image
                    src={chat.spaceImage}
                    alt="spaceImage"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="ml-2 mr-1 flex flex-grow flex-col justify-between py-[2.5px]">
                  <p className="font-SUB3 text-SUB3 leading-SUB3 text-dark_gray">
                    {chat.spaceName}
                  </p>
                  <p className="font-BODY2 text-BODY2 leading-BODY2 text-medium_gray">
                    {chat.lastMessage}
                  </p>
                </div>
                <div className="flex w-[60px] flex-col items-end justify-between font-CAP2 text-CAP2 leading-CAP2">
                  <p className="text-light_gray">
                    {formatMessageListTimestamp(chat.lastMessageAt)}
                  </p>
                  <span className="rounded-full bg-red px-2 py-1 text-center text-white">
                    {chat.unreadCount}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>진행중인 채팅이 없습니다</p>
          )}
        </section>
      </main>
    </div>
  );
}
