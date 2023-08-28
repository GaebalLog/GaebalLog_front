import React from "react";

import Toggle from "@/components/designSystem/Toggle";

const myOptions = [
  { text: "이웃 글 작성 알림", onChange: () => {} },
  { text: "댓글 알림", onChange: () => {} },
  { text: "토론방 알림", onChange: () => {} },
  {
    text: "이웃 비공개",
    onChange: () => {},
    subDescription:
      "* 이웃 비공개 시, 내가 추가한 이웃과 나를 추가한 이웃이 다른 사람에게 보이지 않습니다.",
  },
];
const MySettings = () => {
  return (
    <div className={`px-[54px] py-[40px] w-full h-full overflow-auto`}>
      <h1 className={`font-hack text-[24px] mb-[48px] font-bold`}>알림설정</h1>
      <div className="flex flex-col gap-[32px]">
        {myOptions.map((option) => {
          return (
            <div
              key={`옵션${option.text}`}
              className="flex flex-col gap-[10px]"
            >
              <div className="flex justify-between w-[452px] h-[40px] items-center">
                <span className="text-[20px]">{option.text}</span>
                <Toggle onSuccess={option.onChange} onFail={option.onChange} />
              </div>
              {option.subDescription && (
                <p className="text-[12px]">{option.subDescription}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySettings;
