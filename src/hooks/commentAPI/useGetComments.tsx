import { useQuery } from "@tanstack/react-query";

import { commentAPI } from "@/api/commentAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

interface props {
  postId: number;
  page: number;
}
interface commentList {
  totalResults: number;
  totalPages: number;
  comment: grandParentsComment[];
}
const useGetComments = ({ postId, page }: props) => {
  return useQuery<commentList>({
    queryKey: [QUERY_KEYS.COMMENTS, postId, page],
    queryFn: () => commentAPI.getComments(postId, page).then((res) => res.data),
  });
};

export default useGetComments;
