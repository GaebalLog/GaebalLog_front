import { useMutation } from "@tanstack/react-query";

import { commentAPI } from "@/api/commentAPI";

import useGetComments from "./useGetComments";

const useCreateComment = ({ postId, parentId, content }: createComment) => {
  const data = { postId, parentId, content };
  const { refetch } = useGetComments({ postId });
  return useMutation({
    mutationFn: () => commentAPI.createComment(data),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useCreateComment;
