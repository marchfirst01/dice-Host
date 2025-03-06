import { IMAGES } from '@assets/index';
import { useMessageRoomId, useSendMessage } from '@hooks/useChat';
import ChatLayout from '@layout/chatLayout';
import {
  formatMessageTimeStampTo12Hour,
  formatMessageTimeStampToDay,
} from '@utils/formatMessageTimeStamp';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data, refetch } = useMessageRoomId(Number(id));
  console.log(data);

  // 날짜 비교
  const isSameDate = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // 메세지 전송
  const { mutate: sendMessage } = useSendMessage();
  const [sendContent, setSendContent] = useState('');

  const handleSendMessage = () => {
    console.log(sendContent);
    sendMessage(
      { roomId: Number(id), content: sendContent },
      {
        onSuccess: () => {
          setSendContent('');
          refetch();
        },
      },
    );
  };

  return (
    <ChatLayout>
      {data &&
        data.content.map((chat, index) => (
          <div key={chat.id} className={`${chat.isLoginUsersMessage ? 'text-right' : 'text-left'}`}>
            {index === 0 || !isSameDate(data.content[index - 1]?.createdAt, chat.createdAt) ? (
              <p className="py-2 text-center font-CAP2 text-CAP2 leading-CAP2">
                {formatMessageTimeStampToDay(chat.createdAt)}
              </p>
            ) : null}
            {index === 0 || data.content[index - 1]?.senderName !== chat.senderName ? (
              <p className="pt-4 font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
                {!chat.isLoginUsersMessage && `${chat.senderName} · `}
                {formatMessageTimeStampTo12Hour(chat.createdAt)}
              </p>
            ) : null}
            <p
              className={`mb-1 inline-block rounded-lg ${index > 0 && data.content[index - 1]?.senderName === chat.senderName ? 'rounded-lg' : chat.isLoginUsersMessage ? 'rounded-tr-none' : 'rounded-tl-none'} bg-white px-3 py-2 font-BODY1 text-BODY1 leading-BODY1 text-deep_gray`}
            >
              {chat.content}
            </p>
          </div>
        ))}
      <div className="fixed bottom-0 flex h-[68px] w-full max-w-[400px] -translate-x-5 flex-row bg-white py-2 pl-[6px] pr-5">
        <div className="cursor-pointer p-3">
          <Image src={IMAGES.CameraGray} alt="camera" />
        </div>
        <input
          className="relative w-full rounded-lg border border-light_gray px-3"
          value={sendContent}
          onChange={(e) => setSendContent(e.target.value)}
          placeholder="쪽지 보내기"
        />
        <Image
          className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleSendMessage}
          src={IMAGES.SendGrayFull}
          alt="send"
        />
      </div>
    </ChatLayout>
  );
}
