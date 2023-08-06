import React from "react";
import Image from "next/image";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

const Post: React.FC<{ post: post }> = ({ post }) => {
  const { getIcon } = useIcon();

  const heart = getIcon("heart", 16, 14);
  const eye = getIcon("eye", 18, 16);

  const btns = [
    { id: "heart", icon: heart, count: post.like },
    { id: "search", icon: eye, count: post.count },
  ];
  return (
    <div
      className={`w-[1200px] h-[400px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02}`}
    >
      <div className="w-[332px] h-[280px] overflow-hidden">
        <Image src={post.thumbnail} width={332} height={280} alt={post.title} />
      </div>
      <div className="flex flex-col gap-[80px]">
        <div>
          <h2>{post.nickname}</h2>
          <h1>{post.title}</h1>
          {/* 에디터 구현에 따라 수정필요할지도 */}
          <h3>{post.content}</h3>
        </div>
        <div className="flex items-center gap-[16px]">
          {post.tags.map((tag) => (
            <div key={`${post.postId}${tag}`}>{tag}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="absolute flex gap-[20px] bottom-2 right-3">
          {btns.map((btn) => (
            <Button
              key={btn.id}
              size="withIcon"
              color="background"
              rounded
              className="flex-wrap"
              withIcon
            >
              {btn.icon}
              {btn.count}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
