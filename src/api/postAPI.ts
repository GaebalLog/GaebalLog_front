import { instance } from "./api";

export interface postDataType {
  user_id?: number;
  title: string;
  content: string;
  categories: string[];
  thumbnail: string | null;
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
    return instance.get<postListAuthor>(`/post/detail/${post_id}`);
  },
  delete: (post_id: number) => {
    return instance.delete(`/post/${post_id}`);
  },
  update: (post_id: number, data: postDataType) => {
    return instance.patch(`/post/${post_id}`, { ...data });
  },
  toggleBookmark: (post_id: number) => {
    return instance.post(`/post/bookmark`, { post_id });
  },
  toggleLike: (post_id: number) => {
    return instance.post(`/post/like`, { post_id });
  },
  verify: (post_id: number) => {
    return instance.get(`/post/verify/${post_id}/verify`);
  },
};
