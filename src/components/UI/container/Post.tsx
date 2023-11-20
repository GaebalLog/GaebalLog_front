"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/config/constants/colors";
import { isLoggedInAtom } from "@/hooks/useUserAuth";
import DateConvertor from "@/utils/util-dateConvertor";

import Button from "../buttons/base/Button";
import default_thumbnail from "../../../../public/assets/images/common/thumbnail_default.png";
import LikeView from "../common/LikeView";

const Post: React.FC<{
  post: postDetail;
  bookmarkHandler: (postId: number) => void;
  likeHandler: (postId: number) => void;
}> = ({ post, bookmarkHandler, likeHandler }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const router = useRouter();
  const { getIcon } = useIcon();
  const bookmark = getIcon("bookmark", 48, 80, "cursor hover");
  const checkBookmark = getIcon("checkbook", 48, 80, "cursor hover");

  const localISOString = new DateConvertor(
    post.createdAt,
  ).convertToLocalISOString();
  const dateConvertor = new DateConvertor(localISOString);

  const clickHeartHandler = () => {
    likeHandler(post.postId);
  };

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${post.postId}`);
  };

  const checkBookmarkHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    bookmarkHandler(post.postId);
  };

  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02} ${BORDER_COLOR.container} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`tech${post.postId}`}
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
            <span>{`· ${dateConvertor.formatWithLongTermDifference()}`}</span>
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
              key={`${post.postId}${category}${i}`}
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
