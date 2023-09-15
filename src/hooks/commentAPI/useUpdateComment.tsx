import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { commentAtom } from "@/constants/global/atoms";

const useUpdateComment = ({
  commentId,
  content,
  onSuccess,
}: {
  commentId: number;
  content: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { postId, commentPage } = useRecoilValue(commentAtom);
  return useMutation({
    mutationFn: () => commentAPI.updateComment(commentId, content),
    onSuccess: () => {
      queryClient
        .invalidateQueries([QUERY_KEYS.COMMENTS, postId, commentPage])
        .then(() => {
          onSuccess && onSuccess();
        });
    },
  });
};

export default useUpdateComment;
