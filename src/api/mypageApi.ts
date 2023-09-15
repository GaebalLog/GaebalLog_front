import type { queryData } from "@/components/mypage/article/MySettings";

import { instance } from "./api";

export const mypageApi = {
  updateNickname: (nickname: string) => {
    return instance.patch(`/users/name`, { nickname });
  },
  updateProfileImg: (profileImg: FormData) => {
    return instance.patch(`/users/image`, profileImg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAlertSetting: async () => {
    const { data } = await instance.get(`/users/preferences`);
    return data;
  },
  updateAlertSetting: async (payload: Partial<queryData>) => {
    return await instance.patch(`/users/preferences`, payload);
  },
};