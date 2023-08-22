"use client";

import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";

const BUTTON_VARIANT = {
  tab: `text-[20px] leading-[25px] py-[10px] px-5 rounded-[3px]`,
  category: `text-[20px] h-[40px] leading-[23.28px] py-[10px] px-4 font-hack max-w-[340px] truncate`,
  bigCreate: `text-[32px] leading-[37.25px] py-2 px-4 bg-[#4D4D4D] text-[#DFAE3D]`,
  middleCreate: `text-[16px] leading-[30px] py-4 px-[88px]`,
  smallCreate: `text-[24px] leading-[18.63px] py-[18px]`,
  commentCreate: `text-[24px] leading-normal py-6 px-[100px]`,
  withIcon: `flex items-center gap-2 text-[16px] leading-5 py-2 px-4`,
  tag: `text-[16px] p-2 leading-5 rounded-[3px]`,
  bigLogin: `text-[24px] py-4`,
  login: `text-[11.137px] leading-[16.71px] py-[9.74px] px-[22.27px] rounded-[3px] font-hack`,
  confirm: `text-[24px] leading-[27.94pxpx] py-[10px] px-6 rounded-[3px] font-hack`,
  button: `text-[16px] py-[10px] px-[20px] rounded-[3px]`,
  subTab: `text-[20px] py-[4px]`,
};

const COLOR_VARIANT = {
  white: `${BG_COLOR.primary} ${TEXT_COLOR.primary}`,
  lightGrey: `${BG_COLOR.general02} ${TEXT_COLOR.primary}`,
  grey: `${BG_COLOR.general05} ${TEXT_COLOR.primary}`,
  black: `${BG_COLOR.inverse} ${TEXT_COLOR.inverse}`,
  background: `${BG_COLOR.background} ${TEXT_COLOR.primary}`,
  category: `${BG_COLOR.etcColor01} ${TEXT_COLOR.primary}`,
  cancelButton: `${BG_COLOR.primary} ${TEXT_COLOR.general08}`,
  checkTab: `${BG_COLOR.primary} ${TEXT_COLOR.primary} ${BORDER_COLOR.checkTab}`,
};

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof BUTTON_VARIANT;
  color: keyof typeof COLOR_VARIANT;
  rounded?: boolean;
  border?: boolean;
}

const Button: React.FC<buttonProps> = ({
  size,
  color,
  rounded,
  border,
  className = "",
  children,
  ...props
}: buttonProps) => {
  return (
    <button
      className={`${BUTTON_VARIANT[size]} ${COLOR_VARIANT[color]} ${
        rounded && `rounded-full`
      } ${border && BORDER_COLOR.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
