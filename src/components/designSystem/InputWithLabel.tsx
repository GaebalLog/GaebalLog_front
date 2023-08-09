"use client";

import React from "react";
import type { HTMLAttributes } from "react";

import useIcon from "@/hooks/useIcon";

interface LabelWithInputProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  isPassword?: boolean;
}

const InputWithLabel: React.FC<LabelWithInputProps> = ({
  label,
  isPassword,
  className = "",
  ...props
}) => {
  const [isEyeoff, setIsEyeoff] = React.useState(true);

  const { getIcon } = useIcon();
  const eye = getIcon("eye", 22, 19);
  const eyeoff = getIcon("eyeoff", 22, 19);

  const eyeChangHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEyeoff((prev) => !prev);
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label htmlFor={label} className={`text-2xl leading-none mb-2 font-hack`}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full pl-4 pr-12 py-[14px]`}
          type={isEyeoff ? "password" : "text"}
          {...props}
        />
        {isPassword && (
          <button
            className="absolute top-2/4 right-4 transform -translate-y-1/2"
            onClick={eyeChangHandler}
          >
            {isEyeoff ? eyeoff : eye}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;
