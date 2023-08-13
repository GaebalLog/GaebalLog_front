"use client";

import React from "react";
import type { HTMLAttributes } from "react";

import useIcon from "@/hooks/useIcon";

interface LabelWithInputProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  type?: "email" | "password" | "text";
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputWithLabel: React.FC<LabelWithInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  ...props
}) => {
  const [isEyeoff, setIsEyeoff] = React.useState(true);

  const { getIcon } = useIcon();
  const eye = getIcon("eye", 22, 19);
  const eyeoff = getIcon("eyeoff", 22, 19);

  const filterdType = type === "password" && isEyeoff ? "password" : "text";
  const styles = {
    wrapper: `flex flex-col w-full ${className}`,
    label: `text-2xl leading-none mb-2 font-hack`,
    input: `w-full pl-4 pr-12 py-[14px]`,
  };

  const eyeChangHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEyeoff((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          className={styles.input}
          type={filterdType}
          value={value}
          onChange={onChange}
          {...props}
        />
        {type === "password" && (
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
