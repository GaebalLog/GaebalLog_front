"use client";
import Image from "next/image";
import React from "react";

import search from "../../../public/assets/home/search.png";

interface InputProps {
  type: "header" | "searchModal";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

/**헤더와 검색 모달의 검색 인풋 */
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
}) => {
  let style;

  switch (type) {
    case "searchModal":
      style = {
        container: "relative w-[400px] h-[40px]",
        input: "w-full h-full p-[10px] rounded-[5px]",
      };
      break;
    default: //"header"일 경우
      style = {
        container: "relative w-[666px] h-[48px]",
        input:
          "w-[666px] h-[48px] rounded-[24px] p-[15px] border border-solid border-gray-[600]",
      };
      break;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder || "검색어를 입력해주세요."}
      />
      <Image
        className="absolute top-[15px] right-[15px] cursor-pointer"
        src={search}
        width={18}
        height={18}
        alt="검색"
      />
    </div>
  );
};

export default Input;
