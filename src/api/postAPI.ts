import { instance } from "./api";

export interface postDataType {
  user_id?: number;
  title: string;
  content: string;
  categories: string[];
  img: string[];
}
export interface allPostsType {
  hasMore: boolean;
  posts: postDetail[];
}
const userId = 1;
export const postAPI = {
  create: (data: postDataType) => {
    const sendData = { user_id: userId, ...data };
    return instance.post("/post", sendData);
  },
  getAll: (sort: "views" | "created_at" | "neighbor", page: number) => {
    return instance.get<allPostsType>(
      `/post/all/${sort}/${userId}?page=${page}`,
    );
  },
  getDetail: (post_id: number) => {
    return instance.get<postDetail>(`/post/detail/${post_id}/${userId}`);
  },
  delete: (post_id: number) => {
    return instance.delete(`/post/${post_id}`);
  },
  update: (post_id: number, data: postDataType) => {
    const sendData = { user_id: userId, ...data };
    return instance.patch(`/post/${post_id}`, sendData);
  },
  toggleBookmark: (post_id: number) => {
    const data = { user_id: userId, post_id };
    return instance.post(`/post/bookmark`, data);
  },
  toggleLike: (post_id: number) => {
    const data = { user_id: userId, post_id };
    return instance.post(`/post/like`, data);
  },
};
