"use client";

import React from "react";

// import { TYPOGRAPH_VARIANT } from "@/constants/global/fonts";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "button1" | "button2" | "button3" | "button4";
  bgColor: bgColor;
  color?: color;
  rounded?: boolean;
}

const Button: React.FC<buttonProps> = () =>
  // {
  // size,
  // bgColor,
  // color = "text",
  // rounded,
  // className,
  // ...props
  // }: buttonProps
  {
    // const { bgColorClass, textColorClass } = useColor({ bgColor, color });

    return (
      <></>
      // <button
      //   className={`py-1 px-3 ${
      //     TYPOGRAPH_VARIANT[size]
      //   } bg-[${bgColorClass}] text-[${textColorClass}] ${
      //     rounded && "rounded-3xl"
      //   } ${className}`}
      //   {...props}
      // />
    );
  };

export default Button;
