import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/config/api/commentAPI";
import { QUERY_KEYS } from "@/config/query_config";
import { postAtom } from "@/config/constants/atoms";

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
  const { postId, commentPage } = useRecoilValue(postAtom);
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
