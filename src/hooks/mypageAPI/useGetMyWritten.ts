import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

const query = {
  "내가 북마크한 글": {
    type: "myBookmark",
    fn: () => mypageApi.getMyBookmarks(),
  },
  "내가 댓글 단 글": {
    type: "myComment",
    fn: () => mypageApi.getMyComments(),
  },
  "내가 좋아요 한 글": {
    type: "myLike",
    fn: () => mypageApi.getMyLikes(),
  },
};

const useGetMyWritten = (
  type: "내가 북마크한 글" | "내가 댓글 단 글" | "내가 좋아요 한 글",
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MYWRITTEN, type],
    queryFn: () => axios.get(`/api/mypage/mywritten/${query[type].type}`),
  });
};

export default useGetMyWritten;
