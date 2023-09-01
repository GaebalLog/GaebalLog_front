"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import utilConvertTime from "@/utils/util-datetime";

import Button from "../designSystem/Button";
import { isLoggedInAtom } from "../provider/SettingsProvider";

const Post: React.FC<{ post: postDetail }> = ({ post }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const router = useRouter();

  const { getIcon } = useIcon();
  const heart = getIcon("heart", 16, 14, "cursor hover");
  const eye = getIcon("eye", 18, 16);
  // const bookmark = getIcon("bookmark", 48, 80, "cursor hover");
  // const checkBookmark = getIcon("checkbook", 48, 80, "cursor hover");

  const clickHeartHandler = () => {
    console.log("좋아요");
  };

  const btns = [
    {
      id: "heart",
      icon: heart,
      count: post.like,
      className: "excluded",
      onClick: clickHeartHandler,
    },
    { id: "search", icon: eye, count: post.view },
  ];

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 35번째 코드로 인한 타입 가드
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${post.post_id}`);
  };

  const checkBookmarkHandler = () => {
    console.log("북마크 클릭시 처리");
  };

  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`post${post.post_id}`}
    >
      <div className="w-[332px] h-[280px] overflow-hidden">
        <div
          className="w-[770px] multi-line-ellipsis"
          dangerouslySetInnerHTML={{ __html: post.img }}
        />
      </div>
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <div
            className={`flex gap-[20px] items-center ${TEXT_COLOR.general02}`}
          >
            <span className={`${TEXT_COLOR.general07rev} text-[20px]`}>
              {post.nickname}
            </span>
            <span>{`· ${utilConvertTime(post.created_at, {
              toString: true,
            })}`}</span>
          </div>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {post.title}
          </h1>
          <div
            className="w-[770px] multi-line-ellipsis"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        {isLoggedIn && (
          <div
            className="absolute top-0 right-[40px] excluded"
            onClick={checkBookmarkHandler}
          >
            {/* {post.isBookmarked ? checkBookmark : bookmark} */}
          </div>
        )}
        <div className="flex items-center gap-[16px]">
          {post.categories.map((category, i) => (
            <Button
              key={`${post.post_id}${category}${i}`}
              color="grey"
              size="tag"
            >
              # {category}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="absolute flex gap-[20px] bottom-2 right-3">
          {btns.map((btn) => (
            <Button
              key={`${btn.id}likeView`}
              size="withIcon"
              color="background"
              rounded
              className={`flex-wrap ${btn.className}`}
              onClick={btn.onClick}
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
