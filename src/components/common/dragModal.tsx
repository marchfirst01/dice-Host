import React, { useEffect, useRef, useState } from 'react';

interface DragModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DragModalComponent({ isOpen, onClose, children }: DragModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHeight, setModalHeight] = useState(40); // 초기 높이 40%
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  // 모달이 열릴 때 높이를 40%로 초기화
  useEffect(() => {
    if (isOpen) {
      setModalHeight(40); // 모달 열릴 때 높이 초기화
    }
  }, [isOpen]);

  // 모달이 닫힐 때 높이 설정
  useEffect(() => {
    if (!isOpen) {
      setModalHeight(40); // 모달 닫힐 때 높이를 낮게 유지
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !modalRef.current) return;

    const deltaY = startY - e.clientY; // 드래그 방향을 반대로 설정
    const newHeight = Math.min(60, Math.max(40, modalHeight + (deltaY / window.innerHeight) * 100));
    setModalHeight(newHeight);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // 모달 외부 클릭 시 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-[400px] cursor-grab rounded-t-lg bg-white shadow-lg transition-all duration-300 ease-in-out"
        style={{ height: `${modalHeight}vh` }}
        onMouseDown={handleMouseDown} // 모달 전체에서 드래그 가능하도록
      >
        <div className="h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
