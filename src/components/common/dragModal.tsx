import React, { useEffect, useRef, useState } from 'react';

interface DragModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DragModalComponent({ isOpen, onClose, children }: DragModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalHeight, setModalHeight] = useState(40); // 초기 높이 40%
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  // 모달 열릴 때 높이를 40%로 초기화
  useEffect(() => {
    if (isOpen) {
      setModalHeight(40);
    }
  }, [isOpen]);

  // 높이 조절 함수
  const updateHeight = (deltaY: number) => {
    if (!modalRef.current || !contentRef.current) return;

    const contentHeight = (contentRef.current.scrollHeight / window.innerHeight) * 100;
    const maxAllowedHeight = Math.min(80, contentHeight); // 최대 80%까지 확장 가능
    const newHeight = Math.min(
      maxAllowedHeight,
      Math.max(40, modalHeight - (deltaY / window.innerHeight) * 100),
    );

    setModalHeight(newHeight);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateHeight(e.clientY - startY);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => setIsDragging(false);

  // 터치 이벤트 핸들러 (모바일 지원)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    updateHeight(e.touches[0].clientY - startY);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => setIsDragging(false);

  // 이벤트 리스너 등록
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 모달 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-[400px] cursor-grab rounded-t-lg bg-white shadow-lg transition-all duration-300 ease-in-out"
        style={{ height: `${modalHeight}vh` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart} // 모바일 터치 이벤트 추가
      >
        <div ref={contentRef} className="overflow-auto text-black">
          {children}
        </div>
      </div>
    </div>
  );
}
