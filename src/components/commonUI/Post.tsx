import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

const Post: React.FC<{ post: post }> = ({ post }) => {
  const { getIcon } = useIcon();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const heart = getIcon("heart", 16, 14);
  const eye = getIcon("eye", 18, 16);
  const bookmark = getIcon("bookmark", 48, 80);
  const checkBookmark = getIcon("checkbook", 48, 80);
  const btns = [
    { id: "heart", icon: heart, count: post.like },
    { id: "search", icon: eye, count: post.count },
  ];
  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02}`}
    >
      <div className="w-[332px] h-[280px] overflow-hidden">
        <Image src={post.thumbnail} width={332} height={280} alt={post.title} />
      </div>
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <h2 className={`${TEXT_COLOR.general07rev} text-[20px]`}>
            {post.nickname}
          </h2>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {post.title}
          </h1>
          {/* 에디터 구현에 따라 수정필요할지도 */}
          <p className={`${TEXT_COLOR.text} text-[16px]`}>{post.content}</p>
        </div>
        {isLoggedIn && (
          <div className="absolute top-0 right-[40px]">
            {post.isBookmarked ? checkBookmark : bookmark}
          </div>
        )}
        <div className="flex items-center gap-[16px]">
          {post.categories.map((category) => (
            <Button key={`${post.postId}${category}`} color="grey" size="tag">
              # {category}
            </Button>
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
