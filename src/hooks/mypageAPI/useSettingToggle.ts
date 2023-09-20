import { useMutation, useQuery } from "@tanstack/react-query";

import { mypageAPI } from "@/api/mypageAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

const useSettingToggle = () => {
  const { data } = useQuery<preferencesResponse>({
    queryKey: [QUERY_KEYS.ALERTSETTING],
    queryFn: () => mypageAPI.getAlertSetting(),
  });
  const { mutate } = useMutation({
    mutationFn: (payload: Partial<preferencesResponse>) =>
      mypageAPI.updateAlertSetting(payload),
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
      isChecked: data?.setNeighborPrivate,
      onChange: (checked?: boolean) => {
        mutate({ setNeighborPrivate: !checked });
      },
      subDescription:
        "* 이웃 비공개 시, 내가 추가한 이웃과 나를 추가한 이웃이 다른 사람에게 보이지 않습니다.",
    },
  ];

  return { myOptions };
};

export default useSettingToggle;
