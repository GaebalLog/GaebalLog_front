import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useIcon from "@/hooks/useIcon";
import Button from "@/components/UI/buttons/base/Button";
import { postAPI } from "@/config/api/postAPI";

interface props {
  postId: string;
  like: number;
  view: number;
  queryKey: string[];
}

const MyPostLikeAndView: React.FC<props> = ({
  postId,
  like,
  view,
  queryKey,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postAPI.toggleLike(+postId),
    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },
    onError() {
      alert("좋아요에 실패했습니다.");
    },
  });

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
