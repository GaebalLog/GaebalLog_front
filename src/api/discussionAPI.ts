import { instance } from "./api";

export interface discussionDataType {
  title: string;
  content: string;
  image: string[];
  thumbnail: string | null;
  category: string[];
  startDate?: string;
  endDate?: string;
  capacity: number;
}
export interface allDiscussionsType {
  hasMore: boolean;
  discussions: discussion[];
}
export const discussionAPI = {
  getAll: (sort: "views" | "createdAt" | "neighbor", page: number) => {
    return instance.get<allDiscussionsType>(
      `/discussions/all/${sort}?page=${page}`,
    );
  },
  getDetail: (discussionId: number) => {
    return instance.get<detailDisccussion>(`/discussions/${discussionId}`);
  },
  toggleLike: (discussionId: number) => {
    return instance.post(`/discussions/${discussionId}/like`);
  },
  create: (data: discussionDataType) => {
    return instance.post("/discussions", { ...data });
  },
  delete: (discussionId: number) => {
    return instance.delete(`/discussions/${discussionId}`);
  },
  outDiscussion: (discussionId: number) => {
    return instance.delete(`/discussions/${discussionId}/participation`);
  },
  verify: (discussionId: number) => {
    return instance.get(`/discussions/${discussionId}/verification`);
  },
};
