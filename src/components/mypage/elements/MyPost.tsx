import React from "react";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";
import Button from "@/components/designSystem/Button";

const styles = {
  wrapper: `w-full h-[350px] relative flex items-center px-[32px] ${BG_COLOR.primary} cursor-pointer`,
  postContainer: `flex justify-between flex-col h-full pt-10`,
  contentsBox: {
    wrapper: `flex flex-col gap-[24px]`,
    header: `flex items-center gap-[16px] ${TEXT_COLOR.general07rev}`,
    title: `${TEXT_COLOR.text} text-[24px] font-bold`,
    contents: `truncate-multiline text-[16px] ${TEXT_COLOR.text}`,
    categories: `flex items-center gap-4`,
  },
  likeViewBox: `absolute flex gap-[20px] bottom-2 right-3`,
};

const MyPost: React.FC<{ post: myPost }> = ({ post }) => {
  const [isBookmark, setIsBookmark] = React.useState(false);
  const router = useRouter();

  const { getIcon } = useIcon();
  const checkedSmallBookmark = getIcon("checkedSmallBookmark", 24, 48);
  const smallBookmark = getIcon("smallBookmark", 24, 48);
  const heart = getIcon("heart", 16, 14, "cursor hover");
  const eye = getIcon("eye", 18, 16);
  const localISOString = new DateConvertor(
    post.createdAt,
  ).convertToLocalISOString();
  const dateConvertor = new DateConvertor(localISOString);

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
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${post.postId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={onClickHandler}
      data-testid={`post${post.postId}`}
    >
      <button
        className="absolute top-0 right-6"
        onClick={(e) => {
          e.stopPropagation();
          setIsBookmark((prev) => !prev);
        }}
      >
        {isBookmark ? checkedSmallBookmark : smallBookmark}
      </button>
      <div className={styles.postContainer}>
        <div className={styles.contentsBox.wrapper}>
          <div className={styles.contentsBox.header}>
            <h2 className="text-[20px]">{post?.nickname}</h2>
            <h2>{dateConvertor.formatWithLongDate()}</h2>
          </div>
          <h1 className={styles.contentsBox.title}>{post.title}</h1>
          <div
            className={styles.contentsBox.contents}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.contentsBox.categories}>
            {post.categories.map((category) => (
              <Button key={`${post.postId}${category}`} color="grey" size="tag">
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className={`flex justify-end gap-[20px] pb-6`}>
          {btns.map((btn) => (
            <Button
              key={btn.id}
              size="withIcon"
              color="background"
              border
              rounded
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
