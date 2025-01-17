import React from 'react';

interface CommonButtonComponentProps {
  children: React.ReactNode;
}
export default function CommonButtonComponent({
  children,
}: CommonButtonComponentProps): React.ReactElement<CommonButtonComponentProps> {
  return (
    <button
      onClick={() => console.log('button')}
      className="h-[52px] w-full rounded-lg bg-black p-4 text-white"
    >
      {children}
    </button>
  );
}
