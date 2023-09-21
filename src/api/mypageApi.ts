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
  updateAlertSetting: async (payload: Partial<preferencesResponse>) => {
    return await instance.patch(`/users/preferences`, payload);
  },

  getBlockUser: () => {
    return instance.get(`/users/block`);
  },
  blockUser: (block_id: string) => {
    return instance.post(`/users/block/${block_id}`);
  },
  getFollowing: (id: number, targetId: number) => {
    return instance.post(`/users/neighbors/${id}`, { targetId });
  },
};
