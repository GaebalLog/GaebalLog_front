"use client";

import React from "react";

import { FONT_FAMILY } from "@/constants/global/fonts";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

const BUTTON_VARIANT = {
  tab: `text-[20px] py-[10px] px-5`,
  category: `text-[20px] py-[10px] px-4 ${FONT_FAMILY.hack}`,
  bigCreate: `text-[32px] py-2 px-4 bg-[#4D4D4D] text-[#DFAE3D]`,
  middleCreate: `text-[16px] py-4 px-[88px]`,
  smallCreate: `text-[24px] py-[18px]`,
  withIcon: `text-[16px] py-2 px-4`,
  tag: `text-[16px] p-2`,
  login: `text-[11.137px] py-[9.74px] px-[22.27px] ${FONT_FAMILY.hack}`,
};

const COLOR_VARIANT = {
  white: `${BG_COLOR.primary} ${TEXT_COLOR.primary}`,
  lightGrey: `${BG_COLOR.general02} ${TEXT_COLOR.primary}`,
  grey: `${BG_COLOR.general05} ${TEXT_COLOR.primary}`,
  black: `${BG_COLOR.inverse} ${TEXT_COLOR.inverse}`,
  background: `${BG_COLOR.background} ${TEXT_COLOR.primary}`,
  category: `${BG_COLOR.etcColor01} ${TEXT_COLOR.primary}`,
};

const BORDER_VARIANT = `border border-[#D3D3D3] dark:border-[#6A6A6A]`;

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
  className,
  children,
  ...props
}: buttonProps) => {
  return (
    <button
      className={`${BUTTON_VARIANT[size]} ${COLOR_VARIANT[color]} ${
        rounded && `rounded-full`
      } ${border && BORDER_VARIANT} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
