import React from "react";
import type { ReactNode } from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/config/constants/colors";

const Label: React.FC<{ children: ReactNode; htmlFor: string }> = ({
  children,
  htmlFor,
}) => {
  return (
    <button
      className={`text-[16px] py-[10px] rounded-[3px] ${BG_COLOR.primary} ${TEXT_COLOR.primary} ${BORDER_COLOR.button} cursor-pointer`}
    >
      <label className="py-[10px] px-[20px] cursor-pointer" htmlFor={htmlFor}>
        {children}
      </label>
    </button>
  );
};

export default Label;
