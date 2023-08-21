import React from "react";

import Button from "../designSystem/Button";

const sortList = ["정확도 순", "조회 순", "최신순"];

interface props {
  tab: sortTab;
  setTab: React.Dispatch<React.SetStateAction<sortTab>>;
}
/**
 * 정렬 바 컴포넌트
 * @param tab 탭에 대한 상태 값
 * @param setTab 탭에 대한 상태 값 변경 함수
 */
const SortBar: React.FC<props> = ({ tab, setTab }) => {
  return (
    <div className="flex justify-end gap-[16px] mb-[16px]">
      {sortList.map((item) => (
        <Button
          key={`${item}tab`}
          size="tab"
          color={tab === item ? "black" : "lightGrey"}
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
