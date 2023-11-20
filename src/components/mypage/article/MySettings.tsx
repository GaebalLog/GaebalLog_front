import React from "react";

import Toggle from "@/components/UI/common/Toggle";
import useSettingToggle from "@/hooks/mypageAPI/useSettingToggle";

const MySettings = () => {
  const { myOptions } = useSettingToggle();

  return (
    <div className={`px-[54px] py-[40px] w-full h-full overflow-auto`}>
      <h1 className={`font-hack text-[24px] mb-[48px] font-bold`}>알림설정</h1>
      <div className="flex flex-col gap-[32px]">
        {myOptions.map(({ text, isChecked, onChange, subDescription }) => {
          return (
            <div key={`옵션${text}`} className="flex flex-col gap-[10px]">
              <div className="flex justify-between w-[452px] h-[40px] items-center">
                <span className="text-[20px]">{text}</span>
                <Toggle
                  onSuccess={onChange}
                  onFail={onChange}
                  isChecked={isChecked}
                />
              </div>
              {subDescription && (
                <p className="text-[12px]">{subDescription}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySettings;
