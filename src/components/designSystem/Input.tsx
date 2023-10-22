"use client";
import React from "react";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";

const styles = {
  keywordSearch: {
    container: "relative w-full h-[48px] mb-[53px]",
    input: "w-full h-full pl-[30px] pr-[55px] rounded-full",
  },
  headerSearch: {
    container: `flex relative w-[400px] h-[48px] rounded-[24px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.general06} ${BG_COLOR.primary}`,
    input:
      "w-[400px] h-[48px] px-[15px] rounded-r-[24px] bg-transparent outline-none",
  },
  mypageSearch: {
    container: `flex relative w-[1325px] h-[48px] rounded-[24px] border border-solid mb-[32px] ${BORDER_COLOR.container} ${TEXT_COLOR.general06} ${BG_COLOR.primary}`,
    input: `w-[1325px] h-[48px] px-[15px] rounded-[24px] bg-transparent`,
  },
  icon: `absolute top-[15px] right-[15px] cursor-pointer`,
  dropDown: {
    drop: "w-[100px] h-[48px] cursor-pointer flex items-center justify-end text-[18px] gap-[16px]",
    ul: `absolute top-[48px] left-0 z-10 w-[100px] max-h-[100px] overflow-y-auto rounded-[10px] text-[18px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.primary}`,
    noSelected: `w-full h-[48px] px-[30px] flex items-center cursor-pointer ${BG_COLOR.general01}`,
    selected: `w-full h-[48px] px-[30px] flex items-center cursor-pointer ${BG_COLOR.general06}`,
  },
};
interface InputProps {
  type: "keywordSearch" | "headerSearch" | "mypageSearch";
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (keyword: string) => void;
}

const sortList = ["토의", "기술"] as const;
/**헤더와 검색 모달의 검색 인풋 */
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  onClick,
}) => {
  const { modal, closeModal, toggleModal } = useModalController();

  const { getIcon } = useIcon();
  const [searchSort, setSearchSort] =
    React.useState<(typeof sortList)[number]>("토의");
  const [hoveredItem, setHoveredItem] =
    React.useState<(typeof sortList)[number]>();
  const search = getIcon("search", 18, 18);
  const add = getIcon("add", 18, 18);
  const downBtn = getIcon("downBtn", 8, 12);
  const handleIconClick = () => {
    onClick && onClick(value);
  };

  return (
    <div
      className={styles[type]?.container}
      onClick={(e) => e.stopPropagation()}
    >
      {type === "headerSearch" && (
        <span
          className={styles.dropDown.drop}
          onClick={() => toggleModal("headerTag")}
        >
          {searchSort}
          {downBtn}
        </span>
      )}
      {modal.headerTag && (
        <ul className={styles.dropDown.ul}>
          {sortList.map((sort) => (
            <li
              key={sort}
              className={
                hoveredItem === sort
                  ? styles.dropDown.selected
                  : styles.dropDown.noSelected
              }
              onClick={() => {
                setSearchSort(sort);
                closeModal("headerTag");
              }}
              onMouseOver={() => setHoveredItem(sort)}
              onMouseLeave={() => setHoveredItem(undefined)}
            >
              {sort}
            </li>
          ))}
        </ul>
      )}
      <input
        id={type}
        className={styles[type]?.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "검색어를 입력해주세요."}
      />
      <div className={styles.icon} onClick={handleIconClick}>
        {type === "keywordSearch" ? add : search}
      </div>
    </div>
  );
};

export default Input;
