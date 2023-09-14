import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Toggle from "@/components/designSystem/Toggle";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

export interface queryData {
  darkmodeStatus: boolean;
  neighborAlert: boolean;
  commentAlert: boolean;
  chatAlert: boolean;
}

const MySettings = () => {
  const { data } = useQuery<queryData>({
    queryKey: [QUERY_KEYS.ALERTSETTING],
    queryFn: () => mypageApi.getAlertSetting(),
  });
  const { mutate } = useMutation({
    mutationFn: (payload: Partial<queryData>) =>
      mypageApi.updateAlertSetting(payload),
  });

  const myOptions = [
    {
      text: "이웃 글 작성 알림",
      isChecked: data?.neighborAlert,
      onChange: (checked?: boolean) => {
        mutate({ neighborAlert: !checked });
      },
    },
    {
      text: "댓글 알림",
      isChecked: data?.commentAlert,
      onChange: (checked?: boolean) => {
        mutate({ commentAlert: !checked });
      },
    },
    {
      text: "토론방 알림",
      isChecked: data?.chatAlert,
      onChange: (checked?: boolean) => {
        mutate({ chatAlert: !checked });
      },
    },
    {
      text: "이웃 비공개",
      isChecked: data?.darkmodeStatus,
      onChange: (checked?: boolean) => {
        mutate({ darkmodeStatus: !checked });
      },
      subDescription:
        "* 이웃 비공개 시, 내가 추가한 이웃과 나를 추가한 이웃이 다른 사람에게 보이지 않습니다.",
    },
  ];

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
