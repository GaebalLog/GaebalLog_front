import React from "react";

import { BG_COLOR } from "@/config/constants/colors";

interface deletedCommentProps {
  childComment?: boolean;
}

const DeletedComment: React.FC<deletedCommentProps> = ({ childComment }) => {
  const styles = `flex justify-center items-center w-full h-[224px] ${
    childComment && `h-[215px] ${BG_COLOR.general01} mb-6`
  }`;

  return <div className={styles}>삭제 된 댓글 입니다.</div>;
};

export default DeletedComment;
