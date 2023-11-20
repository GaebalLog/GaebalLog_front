import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useIcon from "@/hooks/useIcon";
import { postAPI } from "@/config/api/postAPI";

interface props {
  postId: string;
  isBookmarked: boolean;
  queryKey: string[];
}

const MyPostBookmark: React.FC<props> = ({
  postId,
  isBookmarked,
  queryKey,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postAPI.toggleBookmark(+postId),
    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },
    onError() {
      alert("북마크에 실패했습니다.");
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
