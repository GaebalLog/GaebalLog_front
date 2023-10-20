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
    return instance.get(`/post/previews?type=me`);
  },
  getMyTempSaves: () => {
    return instance.get(`/post/previews/`);
  },
  getMyBookmarks: () => {
    return instance.get(`/post/previews?type=bookmark`);
  },
  getMyComments: () => {
    return instance.get(`/post/previews?type=comment`);
  },
  getMyLikes: () => {
    return instance.get(`/post/previews?type=like`);
  },

  // 이웃 관리
  addNeighbor: (targetId: string) => {
    return instance.post(`/users/neighbors/${targetId}`);
  },
  checkNeighbor: (targetId: string) => {
    return instance.get(`/users/neighbors/${targetId}`);
  },
  deleteNeighbor: (targetId: string) => {
    return instance.delete(`/users/neighbors/${targetId}`);
  },
  addBlockUser: (block_id: string) => {
    return instance.post(`/users/block/${block_id}`);
  },
  deleteBlockUser: (block_id: string) => {
    return instance.delete(`/users/block/${block_id}`);
  },
  getAddedByMe: (myId: string | null) => {
    return instance.get(`/users/neighbors/following/${myId}`);
  },
  getAddedByYou: (myId: string | null) => {
    return instance.get(`/users/neighbors/follower/${myId}`);
  },
  getAddedByBoth: () => {
    return instance.get(`/neighbors`);
  },
  getBannedByMe: () => {
    return instance.get(`/users/block`);
  },

  // 토의 관리
  getMyDiscussions: () => {
    return instance.get(`/discussions/previews/me`);
  },
  getNeighborDiscussions: () => {
    return instance.get(`/discussions/previews/neighbors`);
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
