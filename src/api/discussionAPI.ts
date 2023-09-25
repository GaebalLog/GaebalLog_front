import { instance } from "./api";

export interface postDataType {
  user_id?: number;
  title: string;
  content: string;
  categories: string[];
  thumbnail: string | null;
  img: string[];
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
};
