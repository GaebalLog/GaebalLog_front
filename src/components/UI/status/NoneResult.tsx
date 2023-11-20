import React from "react";

import useIcon from "@/hooks/useIcon";
interface props {
  py?: `py-[${string}px]`;
  width?: `w-[${string}]`;
}
const NoneResult: React.ComponentType<props> = ({
  py = "py-[66px]",
  width = "w-[100%]",
}) => {
  const { getIcon } = useIcon();
  const search = getIcon("search", 60, 60, "hover");
  return (
    <div
      className={`flex flex-col gap-[24px] justify-center items-center ${py} ${width}`}
    >
      {search}
      <span>검색 결과 없음</span>
      <span>해당 키워드를 찾을 수 없습니다.</span>
    </div>
  );
};

export default NoneResult;
