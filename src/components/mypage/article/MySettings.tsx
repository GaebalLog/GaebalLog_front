import React from "react";

import Toggle from "@/components/designSystem/Toggle";

const myOptions = [
  { text: "이웃 글 작성 알림", onChange: () => {} },
  { text: "댓글 알림", onChange: () => {} },
  { text: "토론방 알림", onChange: () => {} },
];
const MySettings = () => {
  return (
    <div className={`px-[54px] py-[40px] w-full h-full overflow-auto`}>
      <h1 className={`font-hack text-[24px] mb-[65px] font-bold`}>이웃관리</h1>
      <div className="flex flex-col gap-[40px]">
        {myOptions.map((option) => {
          return (
            <div
              key={`옵션${option.text}`}
              className="flex justify-between w-[452px] h-[40px] items-center"
            >
              <span className="text-[20px]">{option.text}</span>
              <Toggle onSuccess={option.onChange} onFail={option.onChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySettings;
