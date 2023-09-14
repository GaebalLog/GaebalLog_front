import { useMutation } from "@tanstack/react-query";

import { commentAPI } from "@/api/commentAPI";

import useGetComments from "./useGetComments";

const useDeleteComment = ({ commentId }: { commentId: number }) => {
  const { refetch } = useGetComments();
  return useMutation({
    mutationFn: () => commentAPI.deleteComment(commentId),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useDeleteComment;
