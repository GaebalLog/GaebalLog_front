import { instance } from "./api";

interface createPost {
  user_id: number;
  title: string;
  content: string;
  categories: string[];
  img: string;
}
export const postAPI = {
  create: (data: createPost) => {
    return instance.post("/api/post", data);
  },
  getAll: () => {
    return instance.get("/api/posts");
  },
  getDetail: (id: number) => {
    return instance.get(`/api/post?id=${id}`);
  },
  delete: (id: number) => {
    return instance.delete(`/api/post/${id}`);
  },
};
