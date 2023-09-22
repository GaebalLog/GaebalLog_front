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

  blockUser: (block_id: string) => {
    return instance.post(`/users/block/${block_id}`);
  },
  getAddedByMe: () => {
    return instance.get(`/neighbors`);
  },
  getAddedByYou: () => {
    return instance.get(`/neighbors`);
  },
  getAddedByBoth: () => {
    return instance.get(`/neighbors`);
  },
  getBannedByMe: () => {
    return instance.get(`/users/block`);
  },

  getMyDiscussion: () => {
    return instance.get(`/mydiscussion/me`);
  },
  getNeighborDiscussion: () => {
    return instance.get(`/mydiscussion/neighbor`);
  },
};
