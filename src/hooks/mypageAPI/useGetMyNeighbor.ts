import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/config/query_config";
import { mypageApi } from "@/config/api/mypageApi";

import { userAtom } from "../useUserAuth";

const useGetMyNeighbor = (
  type: "addedByMe" | "addedByYou" | "addedByBoth" | "bannedByMe",
) => {
  const { userId } = useRecoilValue(userAtom);

  const query = {
    addedByMe: () => mypageApi.getAddedByMe(userId),
    addedByYou: () => mypageApi.getAddedByYou(userId),
    addedByBoth: () => mypageApi.getAddedByBoth(),
    bannedByMe: () => mypageApi.getBannedByMe(),
  };

  return useQuery({
    queryKey: [QUERY_KEYS.NEIGHBOR, type],
    queryFn: query[type],
  });
};

export default useGetMyNeighbor;
