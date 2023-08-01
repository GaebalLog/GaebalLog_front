"use client";

import React from "react";
import ReactDOM from "react-dom";

import useColor from "@/hooks/hook-color";

const stModal = {
  backdrop: `absolute w-screen h-screen inset-0`,
  contentsBox: `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`,
};

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const element = document.getElementById("portal");
  if (!element) {
    return;
  }
  return ReactDOM.createPortal(children, element);
};

interface ModalProps {
  bgColor?: color;
  isOpacity?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  bgColor = "black",
  isOpacity = false,
  children,
}) => {
  const { bgColorClass } = useColor({ bgColor });
  return (
    <Portal>
      <div
        className={`${stModal.backdrop} bg-[${bgColorClass}] ${
          isOpacity && `opacity-40`
        }`}
      />
      <div className={stModal.contentsBox}>{children}</div>
    </Portal>
  );
};

export default Modal;
