import React from "react";

import Button from "../buttons/base/Button";

const sortList = ["조회 순", "최신 순"];

interface props {
  tab: sortTab;
  setTab: React.Dispatch<React.SetStateAction<sortTab>>;
  option?: "mypage";
}
/**
 * 정렬 바 컴포넌트
 * @param tab 탭에 대한 상태 값
 * @param setTab 탭에 대한 상태 값 변경 함수
 */
const SortBar: React.FC<props> = ({ tab, setTab, option }) => {
  return (
    <div className="flex justify-end gap-[16px] mb-[16px]">
      {sortList.map((item) => (
        <Button
          key={`${item}tab`}
          size="tab"
          color={
            tab === item ? "black" : option === "mypage" ? "white" : "lightGrey"
          }
          onClick={() => setTab(item)}
          border
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default SortBar;
