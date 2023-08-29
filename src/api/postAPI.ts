import type { postDetail } from "@/app/tech/[postId]/page";

import { instance } from "./api";

interface createPost {
  user_id: number;
  title: string;
  content: string;
  categories: string[];
  img: string;
}
export interface detailPost {
  data: postDetail;
}
export const postAPI = {
  create: (data: createPost) => {
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
};
