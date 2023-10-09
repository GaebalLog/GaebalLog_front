import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

interface queryData {
  data: myPost[];
}

const query = {
  "내가 쓴 글": {
    type: "myWrittens",
    fn: () => mypageApi.getMyWrittens(),
  },
  "임시저장 글": {
    type: "myTempSaves",
    fn: () => mypageApi.getMyTempSaves(),
  },
  "내가 북마크한 글": {
    type: "myBookmarks",
    fn: () => mypageApi.getMyBookmarks(),
  },
  "내가 댓글 단 글": {
    type: "myComments",
    fn: () => mypageApi.getMyComments(),
  },
  "내가 좋아요 한 글": {
    type: "myLikes",
    fn: () => mypageApi.getMyLikes(),
  },
};

const useGetMyWritten = (
  type:
    | "내가 쓴 글"
    | "임시저장 글"
    | "내가 북마크한 글"
    | "내가 댓글 단 글"
    | "내가 좋아요 한 글",
) => {
  return useQuery<queryData, queryError>({
    queryKey: [QUERY_KEYS.MYWRITTEN, query[type].type],
    queryFn: query[type].fn,
  });
};

export default useGetMyWritten;
