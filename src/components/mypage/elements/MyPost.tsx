import React from "react";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";
import Button from "@/components/designSystem/Button";

const MyPost: React.FC<{ post: post }> = ({ post }) => {
  const router = useRouter();

  const { getIcon } = useIcon();
  const heart = getIcon("heart", 16, 14, "cursor hover");
  const eye = getIcon("eye", 18, 16);
  const dateConvertor = new DateConvertor(post.createdAt + "");

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
    { id: "search", icon: eye, count: post.count },
  ];

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${post.postId}`);
  };

  return (
    <div
      className={`w-full h-[350px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.primary} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`post${post.postId}`}
    >
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <div
            className={`flex items-center gap-[16px] ${TEXT_COLOR.general07rev}`}
          >
            <h2 className="text-[20px]">{post?.nickname}</h2>
            <h2>{dateConvertor.formatWithLongDate()}</h2>
          </div>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {post.title}
          </h1>
          {/* 에디터 구현에 따라 수정필요할지도 */}
          <p
            className={`${TEXT_COLOR.text} text-[16px] w-[320px] whitespace-normal break-words`}
          >
            {post.content}
          </p>
        </div>
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

export default MyPost;
