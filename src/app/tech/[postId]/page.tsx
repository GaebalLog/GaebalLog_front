"use client";

import React from "react";
import { useSetRecoilState } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import CommentContainer from "@/components/tech/detail/CommentContainer";
import { postAtom } from "@/constants/global/atoms";
import ContentContainer from "@/components/tech/detail/ContentContainer";

const styles = {
  wrapper: `flex flex-col items-center w-full]`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  comment: {
    wrapper: `w-full`,
  },
};

export interface detailParams {
  params: {
    postId: string;
  };
}

const Detail = ({ params: { postId } }: detailParams) => {
  const setPostId = useSetRecoilState(postAtom);

  React.useEffect(() => {
    setPostId((prev) => ({ ...prev, postId: +postId }));
  }, [setPostId, postId]);
  return (
    <div className={styles.wrapper}>
      <ContentContainer />
      <hr className={styles.line} />
      <CommentContainer />
    </div>
  );
};

export default Detail;
