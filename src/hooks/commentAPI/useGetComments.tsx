import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { commentAtom } from "@/constants/global/atoms";

interface commentList {
  totalResults: number;
  totalPages: number;
  comment: grandParentsComment[];
}
const useGetComments = () => {
  const { postId, commentPage } = useRecoilValue(commentAtom);
  return useQuery<commentList>({
    queryKey: [QUERY_KEYS.COMMENTS, postId, commentPage],
    queryFn: () =>
      commentAPI.getComments(postId, commentPage).then((res) => res.data),
  });
};

export default useGetComments;
