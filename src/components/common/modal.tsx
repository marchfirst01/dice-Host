import React, { useRef } from 'react';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalComponent({ isOpen, onClose, children }: ModalComponentProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="flex min-h-[100px] w-full max-w-[360px] flex-col items-center justify-center rounded-xl bg-white p-5 font-SUB3 text-SUB3 leading-SUB3 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}
