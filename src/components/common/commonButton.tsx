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
    <button onClick={onClick} className="h-[52px] w-full rounded-lg bg-black p-4 text-white">
      {children}
    </button>
  );
}
