import React from 'react';

interface CommonButtonComponentProps {
  onClick?: (...args: any[]) => any;
  children: React.ReactNode;
}
export default function CommonButtonComponent({
  onClick,
  children,
}: CommonButtonComponentProps): React.ReactElement<CommonButtonComponentProps> {
  return (
    <button
      onClick={onClick}
      className="text-btn1 h-[52px] w-full rounded-lg bg-black p-4 font-BTN1 leading-BTN1 text-white"
    >
      {children}
    </button>
  );
}
