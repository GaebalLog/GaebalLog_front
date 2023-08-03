/**
 *
 * @description
 * 화면 정중앙에 위치하는 모달 컴포넌트
 */

"use client";

import React from "react";
import ReactDOM from "react-dom";

import { BG_COLOR } from "@/constants/global/colors";

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const element = document.getElementById("portal");
  if (!element) {
    return;
  }
  return ReactDOM.createPortal(children, element);
};

interface modalProps {
  isFixed?: boolean;
  isBgColor?: boolean;
  blockScroll?: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({
  isFixed,
  isBgColor,
  blockScroll,
  onBackdropClick, // 모달 닫을 때 사용하는 함수
  children,
}) => {
  const stModal = {
    backdrop: `fixed w-full h-full inset-0`,
    contentsBox: `${
      isFixed ? "fixed" : "absolute"
    } ${`top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}`,
  };

  React.useEffect(() => {
    if (blockScroll) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [blockScroll]);

  return (
    <Portal>
      <div
        className={`${stModal.backdrop} ${
          isBgColor && `${BG_COLOR.inverse} opacity-40`
        }`}
        onClick={onBackdropClick}
      />
      <div className={stModal.contentsBox}>{children}</div>
    </Portal>
  );
};

export default Modal;
