import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { postAPI } from "@/api/postAPI";
interface postProps {
  sort: "views" | "createdAt" | "neighbor";
}
const useGetPost = ({ sort }: postProps) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTLIST, sort],
    queryFn: ({ pageParam = 1 }) => postAPI.getAll(sort, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.hasMore ? allPages.length + 1 : undefined;
    },
  });
};

export default useGetPost;
