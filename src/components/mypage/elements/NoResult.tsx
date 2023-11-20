import React from "react";

import { BG_COLOR } from "@/config/constants/colors";
import useIcon from "@/hooks/useIcon";

const NoResult = () => {
  const { getIcon } = useIcon();
  const search = getIcon("search", 60, 60);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 w-[1280px] h-[300px] shadow-xl ${BG_COLOR.primary}`}
    >
      <div>{search}</div>
      <h3 className="text-xl font-bold">검색 결과 없음</h3>
      <p>해당 키워드를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NoResult;
