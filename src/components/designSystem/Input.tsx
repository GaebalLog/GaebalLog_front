"use client";
import Image from "next/image";
import React from "react";

import search from "../../../public/assets/images/home/search.png";

const styles = {
  searchModal: {
    container: "relative w-full h-[48px] mb-[53px]",
    input: "w-full h-full pl-[30px] pr-[55px] rounded-full",
  },
  header: {
    container: "relative w-[666px] h-[48px]",
    input:
      "w-[666px] h-[48px] rounded-[24px] p-[15px] border border-solid border-gray-[600]",
  },
};
interface InputProps {
  type: keyof typeof styles;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

/**헤더와 검색 모달의 검색 인풋 */
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles[type].container}>
      <input
        id={type}
        className={styles[type].input}
        value={value}
        onChange={onChange}
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
