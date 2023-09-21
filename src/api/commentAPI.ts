import { instance } from "./api";

export const commentAPI = {
  getComments: (postId: number, page: number) =>
    instance.get<commentList>(`/comments?postId=${postId}&page=${page}`),
  createComment: (data: createComment) =>
    instance.post(`/comments`, { ...data }),
  deleteComment: (commentId: number) =>
    instance.delete(`/comments/${commentId}`),
  updateComment: (commentId: number, content: string) =>
    instance.patch(`/comments/${commentId}`, { content }),
};
