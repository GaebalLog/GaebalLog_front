import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import Button from "@/components/UI/buttons/base/Button";
import useIcon from "@/hooks/useIcon";
import { QUERY_KEYS } from "@/config/query_config";
import useToggleDiscussionLike from "@/hooks/discussionAPI/useToggleDiscussionLike";
import { discussionAtom } from "@/config/constants/atoms";

interface props {
  liked: boolean;
  like: number;
}
const LikeDiscussionBtn: React.FC<props> = ({ like, liked }) => {
  const { getIcon } = useIcon();
  const unLikedIcon = getIcon("like", 18, 18);
  const likedIcon = getIcon("liked", 18, 18);
  const { discussionId } = useRecoilValue(discussionAtom);

  const queryClient = useQueryClient();
  const onSuccessHandler = (discussionId: number) => {
    queryClient.invalidateQueries([QUERY_KEYS.DISCUSSION, discussionId]);
  };
  const { mutate } = useToggleDiscussionLike({ onToggle: onSuccessHandler });
  return (
    <Button
      data-testid="likeBtn"
      size="withIcon"
      color="white"
      border
      rounded
      onClick={() => mutate(discussionId)}
    >
      <div>{liked ? likedIcon : unLikedIcon}</div>
      <span>{like}</span>
    </Button>
  );
};

export default LikeDiscussionBtn;
