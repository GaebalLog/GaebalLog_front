import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

const query = {
  addedByMe: { key: QUERY_KEYS.ADDEDBYME, fn: () => mypageApi.getAddedByMe() },
  addedByYou: {
    key: QUERY_KEYS.ADDEDBYYOU,
    fn: () => mypageApi.getAddedByYou(),
  },
  addedByBoth: {
    key: QUERY_KEYS.ADDEDBYBOTH,
    fn: () => mypageApi.getAddedByBoth(),
  },
  bannedByMe: {
    key: QUERY_KEYS.BANNEDBYME,
    fn: () => mypageApi.getBannedByMe(),
  },
};

const useGetMyNeighbor = (
  type: "addedByMe" | "addedByYou" | "addedByBoth" | "bannedByMe",
) => {
  return useQuery({
    queryKey: [query[type].key, type],
    queryFn: () => axios.get(`/api/neighbors/${type}`),
  });
};

export default useGetMyNeighbor;
