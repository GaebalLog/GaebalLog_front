import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/config/api/commentAPI";
import { postAtom } from "@/config/constants/atoms";
import { QUERY_KEYS } from "@/config/query_config";

interface params {
  parentId?: number | null;
  content: string;
  onSuccess?: () => void;
}
const useCreateComment = ({ parentId, content, onSuccess }: params) => {
  const { postId, commentPage } = useRecoilValue(postAtom);
  const data = { postId, parentId, content };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentAPI.createComment(data),
    onSuccess: () => {
      queryClient
        .invalidateQueries([QUERY_KEYS.COMMENTS, postId, commentPage])
        .then(() => {
          onSuccess && onSuccess();
        });
    },
  });
};

export default useCreateComment;
