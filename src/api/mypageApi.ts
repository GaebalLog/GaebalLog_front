import { instance } from "./api";

export const mypageApi = {
  // 내 정보
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

  // 글 관리
  getMyWrittens: () => {
    return instance.get(`/mywritten/myWrittens`);
  },
  getMyTempSaves: () => {
    return instance.get(`/mywritten/myTempSaves`);
  },
  getMyBookmarks: () => {
    return instance.get(`/mywritten/myBookmark`);
  },
  getMyComments: () => {
    return instance.get(`/mywritten/myComment`);
  },
  getMyLikes: () => {
    return instance.get(`/mywritten/myLike`);
  },

  // 이웃 관리
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

  // 토의 관리
  getMyDiscussions: () => {
    return instance.get(`/mydiscussion/me`);
  },
  getNeighborDiscussions: () => {
    return instance.get(`/mydiscussion/neighbor`);
  },

  // 설정
  getAlertSetting: async () => {
    const { data } = await instance.get(`/users/preferences`);
    return data;
  },
  updateAlertSetting: async (payload: Partial<preferencesResponse>) => {
    return await instance.patch(`/users/preferences`, payload);
  },
};
