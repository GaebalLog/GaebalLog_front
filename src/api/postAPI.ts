import type { postDetail } from "@/app/tech/[postId]/page";

import { instance } from "./api";

interface createPost {
  user_id: number;
  title: string;
  content: string;
  categories: string[];
  img: string;
}
interface detailPost {
  data: postDetail;
}
export const postAPI = {
  create: (data: createPost) => {
    return instance.post("/api/post", data);
  },
  getAll: () => {
    return instance.get("/api/posts");
  },
  getDetail: (id: number) => {
    return instance.get<detailPost>(`/api/post?id=${id}`);
  },
  delete: (id: number) => {
    return instance.delete(`/api/post/${id}`);
  },
};
