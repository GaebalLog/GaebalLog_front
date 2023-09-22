import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { postAtom } from "@/constants/global/atoms";

const useGetComments = () => {
  const { postId, commentPage } = useRecoilValue(postAtom);
  return useQuery<commentList>({
    queryKey: [QUERY_KEYS.COMMENTS, postId, commentPage],
    queryFn: () =>
      commentAPI.getComments(postId, commentPage).then((res) => res.data),
    enabled: postId !== 0,
  });
};

export default useGetComments;
