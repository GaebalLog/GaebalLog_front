"use client";

import React from "react";
import { TYPOGRAPH_VARIANT } from "./fonts";
import COLOR_VARIANT from "./colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "button1" | "button2" | "button3" | "button4";
  bgColor: Color;
  color?: Color;
}

export const Button = ({ size, bgColor, color = "black", className, ...props }: ButtonProps) => {
  const darkMode = "default";

  return (
    <button
      className={`py-1 px-2 ${TYPOGRAPH_VARIANT[size]} bg-[${COLOR_VARIANT[bgColor][darkMode]}] text-[${COLOR_VARIANT[color][darkMode]}] ${className}`}
      {...props}
    />
  );
};
