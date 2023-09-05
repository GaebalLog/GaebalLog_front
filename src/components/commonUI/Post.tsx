"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import utilConvertTime from "@/utils/util-datetime";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import Button from "../designSystem/Button";
import default_thumbnail from "../../../public/assets/images/common/thumbnail_default.png";

import LikeView from "./LikeView";

const Post: React.FC<{
  post: postDetail;
  bookmarkHandler: (post_id: number) => void;
  likeHandler: (post_id: number) => void;
}> = ({ post, bookmarkHandler, likeHandler }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const router = useRouter();
  const { getIcon } = useIcon();
  const bookmark = getIcon("bookmark", 48, 80, "cursor hover");
  const checkBookmark = getIcon("checkbook", 48, 80, "cursor hover");

  const clickHeartHandler = () => {
    likeHandler(post.post_id);
  };

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${post.post_id}`);
  };

  const checkBookmarkHandler = () => {
    bookmarkHandler(post.post_id);
  };

  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`post${post.post_id}`}
    >
      {!post.thumbnail ? (
        <Image
          src={default_thumbnail}
          width={280}
          height={280}
          alt="썸네일"
          className={`${BG_COLOR.general05}`}
        />
      ) : (
        <div className="w-[280px] h-[280px] overflow-hidden">
          <div
            className="w-[280px] thumbnail-box"
            dangerouslySetInnerHTML={{ __html: post.thumbnail }}
          />
        </div>
      )}
      <div className="flex justify-between flex-col w-[700px] h-[280px] gap-[80px]">
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
            {post.bookmarked ? checkBookmark : bookmark}
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
        <LikeView
          like={post.like}
          likeHandler={clickHeartHandler}
          liked={post.liked}
          view={post.view}
          option={{ absolute: true }}
        />
      </div>
    </div>
  );
};

export default Post;
