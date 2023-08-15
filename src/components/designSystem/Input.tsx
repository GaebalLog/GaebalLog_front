"use client";
import React from "react";

import useIcon from "@/hooks/useIcon";

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
  icon: `absolute top-[15px] right-[15px] cursor-pointer`,
};
interface InputProps {
  type: "searchModal" | "header";
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (keyword: string) => void;
}

/**헤더와 검색 모달의 검색 인풋 */
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  onClick,
}) => {
  const { getIcon } = useIcon();
  const search = getIcon("search", 18, 18);

  const handleIconClick = () => {
    onClick && onClick(value);
  };

  return (
    <div className={styles[type].container}>
      <input
        id={type}
        className={styles[type].input}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "검색어를 입력해주세요."}
      />
      <div className={styles.icon} onClick={handleIconClick}>
        {search}
      </div>
    </div>
  );
};

export default Input;
