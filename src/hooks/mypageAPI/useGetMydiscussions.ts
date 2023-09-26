import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

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

const useGetMydiscussions = (type: "내가 쓴 토의" | "이웃이 쓴 토의") => {
  return useQuery({
    queryKey: [QUERY_KEYS.MYDISCUSSION, type],
    queryFn: () => axios.get(`/api/mypage/mydiscussion/${query[type].type}`),
  });
};

export default useGetMydiscussions;
