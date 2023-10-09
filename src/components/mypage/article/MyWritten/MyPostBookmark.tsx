import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useIcon from "@/hooks/useIcon";
import { postAPI } from "@/api/postAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

import type { myWrttenType } from "./MyWritten";

const query = {
  "내가 쓴 글": "myWrittens",
  "임시저장 글": "myTempSaves",
  "내가 북마크한 글": "myBookmarks",
  "내가 댓글 단 글": "myComments",
  "내가 좋아요 한 글": "myLikes",
};

interface props {
  postId: string;
  isBookmarked: boolean;
  dropDownType: myWrttenType;
}

const MyPostBookmark: React.FC<props> = ({
  postId,
  isBookmarked,
  dropDownType,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postAPI.toggleBookmark(+postId),
    onSuccess() {
      queryClient.invalidateQueries([
        QUERY_KEYS.MYWRITTEN,
        query[dropDownType],
      ]);
    },
  });

  const { getIcon } = useIcon();
  const checkedSmallBookmark = getIcon("checkedSmallBookmark", 24, 48);
  const smallBookmark = getIcon("smallBookmark", 24, 48);

  return (
    <button
      className="absolute top-0 right-6"
      onClick={(e) => {
        e.stopPropagation();
        mutate();
      }}
    >
      {isBookmarked ? checkedSmallBookmark : smallBookmark}
    </button>
  );
};

export default MyPostBookmark;
