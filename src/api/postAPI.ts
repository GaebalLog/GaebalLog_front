import type { postDetail } from "@/app/tech/[postId]/page";

import { instance } from "./api";

export interface postDataType {
  user_id?: number;
  title: string;
  content: string;
  categories: string[];
  img?: string;
}
export interface detailPost {
  data: postDetail;
}
export const postAPI = {
  create: (data: postDataType) => {
    return instance.post("/post", data);
  },
  getAll: () => {
    return instance.get("/posts");
  },
  getDetail: (id: number) => {
    return instance.get<postDetail>(`/post?id=${id}`);
  },
  delete: (id: number) => {
    return instance.delete(`/post/${id}`);
  },
  update: (id: number, data: postDataType) => {
    return instance.patch(`/post/${id}`, data);
  },
};
