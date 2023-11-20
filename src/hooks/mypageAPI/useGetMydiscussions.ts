import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/config/query_config";
import { mypageApi } from "@/config/api/mypageApi";

const useGetMydiscussions = (type: "내가 쓴 토의" | "이웃이 쓴 토의") => {
  const query = {
    "내가 쓴 토의": {
      type: "me",
      fn: () => mypageApi.getMyDiscussions(),
    },
    "이웃이 쓴 토의": {
      type: "neighbor",
      fn: () => mypageApi.getNeighborDiscussions(),
    },
  };
  return useQuery({
    queryKey: [QUERY_KEYS.MYDISCUSSION, query[type]],
    queryFn: query[type].fn,
  });
};

export default useGetMydiscussions;
