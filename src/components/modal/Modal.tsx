"use client";

import React from "react";
import ReactDOM from "react-dom";

import { BG_COLOR } from "@/constants/global/colors";

const stModal = {
  backdrop: `fixed w-screen h-screen inset-0`,
  contentsBox: `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`,
};

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const element = document.getElementById("portal");
  if (!element) {
    return;
  }
  return ReactDOM.createPortal(children, element);
};

interface ModalProps {
  background?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ background = false, children }) => {
  return (
    <Portal>
      <div
        className={`${stModal.backdrop} ${
          background && `${BG_COLOR.inverse} opacity-40`
        }`}
      />
      <div className={stModal.contentsBox}>{children}</div>
    </Portal>
  );
};

export default Modal;
