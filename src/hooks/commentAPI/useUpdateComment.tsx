import { useMutation } from "@tanstack/react-query";

import { commentAPI } from "@/api/commentAPI";

import useGetComments from "./useGetComments";

const useUpdateComment = ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  const { refetch } = useGetComments();
  return useMutation({
    mutationFn: () => commentAPI.updateComment(commentId, content),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useUpdateComment;
