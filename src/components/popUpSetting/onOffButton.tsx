import React, { Dispatch } from 'react';

interface OnOffButtonComponentProps {
  isOn: boolean;
  setIsOn: Dispatch<boolean>;
}

export default function OnOffButtonComponent({ isOn, setIsOn }: OnOffButtonComponentProps) {
  return (
    <div
      className={`flex h-8 w-12 cursor-pointer items-center rounded-full px-1 transition-colors duration-300 ${
        isOn ? 'bg-green' : 'bg-gray-300'
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          isOn ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </div>
  );
}
