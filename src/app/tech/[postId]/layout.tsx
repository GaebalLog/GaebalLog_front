import React from "react";

import { postAPI } from "@/config/api/postAPI";

export interface detailParams {
  params: {
    postId: number;
  };
}

export const generateMetadata = async ({
  params: { postId },
}: detailParams) => {
  const postInfo = await postAPI.getDetail(postId);
  const { title, content } = postInfo.data;
  return {
    title,
    describe: content,
  };
};

const DetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="flex flex-col items-center">{children}</main>;
};

export default DetailLayout;
