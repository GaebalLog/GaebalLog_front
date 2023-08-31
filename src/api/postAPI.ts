import { instance } from "./api";

export interface postDataType {
  user_id?: number;
  title: string;
  content: string;
  categories: string[];
  img?: string;
}
export interface allPostsType {
  hasMore: boolean;
  posts: postDetail[];
}
export const postAPI = {
  create: (data: postDataType) => {
    const sendData = {
      user_id: 24,
      img: "img",
      ...data,
    };
    return instance.post("/post", sendData);
  },
  getAll: (sort: "views" | "created_at" | "neighbors", page: number) => {
    return instance.get<allPostsType>(`/post/all/${sort}?page=${page}`);
  },
  getDetail: (id: number) => {
    return instance.get<postDetail>(`/post/detail/${id}`);
  },
  delete: (id: number) => {
    return instance.delete(`/post/${id}`);
  },
  update: (id: number, data: postDataType) => {
    const sendData = {
      user_id: 24,
      img: "img",
      ...data,
    };
    return instance.patch(`/post/${id}`, sendData);
  },
};
