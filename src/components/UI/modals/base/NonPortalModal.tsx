/**
 *
 * @description
 * 포탈을 사용하지 않아 클릭하는 요소에 나타나는 모달
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
  topLeft: { top: number; left?: number; right?: number };
  nonBackdrop?: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
}

const NonPortalModal: React.FC<nonPortalModalProps> = ({
  topLeft,
  nonBackdrop,
  onBackdropClick, // 모달 닫을 때 사용하는 함수
  children,
}) => {
  const styles = {
    backdrop: `fixed w-full h-full inset-0`,
    contentsBox: `absolute z-10`,
  };

  return (
    <div>
      {!nonBackdrop && (
        <div
          className={`${styles.backdrop} cursor-auto`}
          onClick={onBackdropClick}
        />
      )}
      <div className={styles.contentsBox} style={topLeft}>
        {children}
      </div>
    </div>
  );
};

export default NonPortalModal;
