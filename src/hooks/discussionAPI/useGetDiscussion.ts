import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { discussionAPI } from "@/api/discussionAPI";
import { utilErrorCase } from "@/utils/util-errorCase";
interface postProps {
  sort: "views" | "createdAt" | "neighbor";
}
const useGetDiscussion = ({ sort }: postProps) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.DISCUSSIONLIST, sort],
    queryFn: ({ pageParam = 1 }) => discussionAPI.getAll(sort, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.hasMore ? allPages.length + 1 : undefined;
    },
    onError(error: error) {
      utilErrorCase(error.response.status);
    },
  });
};

export default useGetDiscussion;
