import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { postAtom } from "@/constants/global/atoms";
import { QUERY_KEYS } from "@/constants/global/querykeys";

const useDeleteComment = ({
  commentId,
  onSuccess,
}: {
  commentId: number;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { postId, commentPage } = useRecoilValue(postAtom);
  return useMutation({
    mutationFn: () => commentAPI.deleteComment(commentId),
    onSuccess: () => {
      queryClient
        .invalidateQueries([QUERY_KEYS.COMMENTS, postId, commentPage])
        .then(() => {
          onSuccess && onSuccess();
        });
    },
  });
};

export default useDeleteComment;
