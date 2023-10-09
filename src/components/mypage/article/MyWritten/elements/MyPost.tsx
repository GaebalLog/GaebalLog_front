import React from "react";
import { useRouter } from "next/navigation";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";
import Button from "@/components/designSystem/Button";

import type { myWrttenType } from "../MyWritten";

import MyPostBookmark from "./MyPostBookmark";
import MyPostLikeAndView from "./MyPostLikeAndView";

const styles = {
  wrapper: `w-full h-[350px] relative flex items-center px-[32px] ${BG_COLOR.primary} cursor-pointer`,
  postContainer: `flex justify-between flex-col w-full h-full pt-10`,
  contentsBox: {
    wrapper: `flex flex-col`,
    header: `flex items-center mb-1 gap-[16px] ${TEXT_COLOR.general07rev}`,
    title: `mb-8 ${TEXT_COLOR.text} text-[24px] font-bold`,
    contents: `mb-5 truncate-multiline text-[16px] ${TEXT_COLOR.text}`,
    categories: `flex items-center gap-4`,
  },
};

interface props {
  post: myPost;
  dropDownType: myWrttenType;
}

const MyPost: React.FC<props> = ({
  post: {
    postId,
    createdAt,
    nickname,
    title,
    content,
    categories,
    isBookmarked,
    like,
    view,
  },
  dropDownType,
}) => {
  const router = useRouter();

  const localISOString = new DateConvertor(createdAt).convertToLocalISOString();
  const dateConvertor = new DateConvertor(localISOString);

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/tech/${postId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={onClickHandler}
      data-testid={`post${postId}`}
    >
      <MyPostBookmark
        postId={postId}
        isBookmarked={isBookmarked}
        dropDownType={dropDownType}
      />
      <div className={styles.postContainer}>
        <div className={styles.contentsBox.wrapper}>
          <div className={styles.contentsBox.header}>
            <h2 className="text-[20px]">{nickname}</h2>
            <h2>{dateConvertor.formatWithLongDate()}</h2>
          </div>
          <h1 className={styles.contentsBox.title}>{title}</h1>
          <div
            className={styles.contentsBox.contents}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className={styles.contentsBox.categories}>
            {categories.map((category) => (
              <Button key={`${postId}${category}`} color="grey" size="tag">
                {category}
              </Button>
            ))}
          </div>
        </div>
        <MyPostLikeAndView
          postId={postId}
          like={like}
          view={view}
          dropDownType={dropDownType}
        />
      </div>
    </div>
  );
};

export default MyPost;
