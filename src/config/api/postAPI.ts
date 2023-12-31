import { instance } from "../axios_config";

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
export const postAPI = {
  create: (data: postDataType) => {
    return instance.post("/post", { ...data });
  },
  getAll: (sort: "views" | "createdAt" | "neighbor", page: number) => {
    return instance.get<allPostsType>(`/post/all/${sort}?page=${page}`);
  },
  getDetail: (postId: number) => {
    return instance.get<postListAuthor>(`/post/detail/${postId}`);
  },
  delete: (postId: number) => {
    return instance.delete(`/post/${postId}`);
  },
  update: (postId: number, data: postDataType) => {
    return instance.patch(`/post/${postId}`, { ...data });
  },
  toggleBookmark: (postId: number) => {
    return instance.post(`/post/${postId}/bookmark`);
  },
  toggleLike: (postId: number) => {
    return instance.post(`/post/${postId}/like`);
  },
  verify: (postId: number) => {
    return instance.get(`/post/${postId}/verification`);
  },
};
