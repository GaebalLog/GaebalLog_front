import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { commentPageAtom } from "@/constants/global/atoms";

interface props {
  postId: number;
}
interface commentList {
  totalResults: number;
  totalPages: number;
  comment: grandParentsComment[];
}
const useGetComments = ({ postId }: props) => {
  const page = useRecoilValue(commentPageAtom);
  return useQuery<commentList>({
    queryKey: [QUERY_KEYS.COMMENTS, postId, page],
    queryFn: () => commentAPI.getComments(postId, page).then((res) => res.data),
  });
};

export default useGetComments;
