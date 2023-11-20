import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/config/query_config";
import { postAPI } from "@/config/api/postAPI";
import { utilErrorCase } from "@/utils/util-errorCase";
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
    onError(error: error) {
      utilErrorCase(error.response.status);
    },
  });
};

export default useGetPost;
