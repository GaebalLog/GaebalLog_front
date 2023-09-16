import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";

interface validationTextProps {
  text: string;
  type: "default" | "password" | "success" | "error";
  isHighlightColor?: boolean;
  isLoginPage?: boolean;
}

const ValidationText: React.FC<validationTextProps> = ({
  text,
  type,
  isHighlightColor,
  isLoginPage,
}) => {
  const COLOR_VARIANT = {
    default: isHighlightColor ? TEXT_COLOR.error : "text-transparent",
    password: isHighlightColor ? TEXT_COLOR.error : TEXT_COLOR.general07rev,
    success: TEXT_COLOR.success,
    error: TEXT_COLOR.error,
  };

  const style = isLoginPage ? "-mt-[30px] -mb-7" : "mt-[10px]";

  return (
    <p className={`${style} select-none ${COLOR_VARIANT[type]}`}>{text}</p>
  );
};

export default ValidationText;
