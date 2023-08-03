/**
 *
 * @description
 * 포탈을 사용하지 않고 클릭하는 요소에 나타나는 모달
 * @example
 * <div className="relative">
 *  <button>모달 여는 버튼</button>
 *  {isModal &&
 *    <NonPortalModal topLeft={{ top: 10, left: 0 }}>
 *     <div>모달 내용</div>
 *    </NonPortalModal>
 *   }
 * </div>
 */

"use client";

import React from "react";

interface nonPortalModalProps {
  topLeft: { top: number; left: number };
  noneBackdrop?: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
}

const NonPortalModal: React.FC<nonPortalModalProps> = ({
  topLeft,
  noneBackdrop,
  onBackdropClick, // 모달 닫을 때 사용하는 함수
  children,
}) => {
  const stModal = {
    backdrop: `fixed w-full h-full inset-0`,
    contentsBox: `absolute`,
  };

  return (
    <div>
      {!noneBackdrop && (
        <div className={`${stModal.backdrop}`} onClick={onBackdropClick} />
      )}
      <div className={stModal.contentsBox} style={topLeft}>
        {children}
      </div>
    </div>
  );
};

export default NonPortalModal;
