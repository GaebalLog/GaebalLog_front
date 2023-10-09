import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useIcon from "@/hooks/useIcon";
import Button from "@/components/designSystem/Button";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import { postAPI } from "@/api/postAPI";

import type { myWrttenType } from "../MyWritten";

const query = {
  "내가 쓴 글": "myWrittens",
  "임시저장 글": "myTempSaves",
  "내가 북마크한 글": "myBookmarks",
  "내가 댓글 단 글": "myComments",
  "내가 좋아요 한 글": "myLikes",
};

interface props {
  postId: string;
  like: number;
  view: number;
  dropDownType: myWrttenType;
}

const MyPostLikeAndView: React.FC<props> = ({
  postId,
  like,
  view,
  dropDownType,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postAPI.toggleLike(+postId),
    onSuccess() {
      queryClient.invalidateQueries([
        QUERY_KEYS.MYWRITTEN,
        query[dropDownType],
      ]);
    },
    onError() {
      alert("좋아요에 실패했습니다.");
    },
  });
  console.log(view);

  const { getIcon } = useIcon();
  const heart = getIcon("heart", 16, 14, "cursor hover");
  const eye = getIcon("eye", 18, 16);

  const clickHeartHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  const btns = [
    {
      id: "heart",
      icon: heart,
      count: like,
      className: "excluded",
      onClick: clickHeartHandler,
    },
    { id: "search", icon: eye, count: view },
  ];

  return (
    <div className={`flex justify-end gap-[20px] pb-6`}>
      {btns.map((btn) => (
        <Button
          key={btn.id}
          size="withIcon"
          color="background"
          border
          rounded
          onClick={btn.onClick}
        >
          {btn.icon}
          {btn.count}
        </Button>
      ))}
    </div>
  );
};

export default MyPostLikeAndView;
