import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { discussionAPI } from "@/api/discussionAPI";
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
  });
};

export default useGetDiscussion;
