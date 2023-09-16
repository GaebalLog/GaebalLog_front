import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";

interface validationTextProps {
  text: string;
  type: "default" | "password" | "success" | "error";
  isHighlightColor?: boolean;
}

const ValidationText: React.FC<validationTextProps> = ({
  text,
  type,
  isHighlightColor,
}) => {
  const COLOR_VARIANT = {
    default: isHighlightColor ? TEXT_COLOR.error : "text-transparent",
    password: isHighlightColor ? TEXT_COLOR.error : TEXT_COLOR.general07rev,
    success: TEXT_COLOR.success,
    error: TEXT_COLOR.error,
  };

  return (
    <p className={`mt-[10px] select-none ${COLOR_VARIANT[type]}`}>{text}</p>
  );
};

export default ValidationText;
