import { useMessageRoomId } from '@hooks/useChat';
import ChatLayout from '@layout/chatLayout';
import {
  formatMessageTimeStampTo12Hour,
  formatMessageTimeStampToDay,
} from '@utils/formatMessageTimeStamp';

import React from 'react';

import { useRouter } from 'next/router';

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data } = useMessageRoomId(Number(id));
  console.log(data);

  const isSameDate = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    console.log(
      d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate(),
    );
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    data && (
      <ChatLayout>
        {data.content.map((chat, index) => (
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
      </ChatLayout>
    )
  );
}
