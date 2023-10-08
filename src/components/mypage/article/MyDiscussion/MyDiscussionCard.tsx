import React from "react";
import { useRouter } from "next/navigation";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";

import Button from "../../../designSystem/Button";

import ProgressStatus from "./ProgressStatus";

const styles = {
  cardBox: `w-full h-[350px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.primary} cursor-pointer`,
  contentsWrapper: `flex flex-col gap-[24px]`,
  header: `flex items-center gap-[16px] ${TEXT_COLOR.general07rev}`,
  nickname: `${TEXT_COLOR.general07rev} text-[20px]`,
  title: `${TEXT_COLOR.text} text-[24px] font-bold`,
  categories: `flex items-center gap-[16px] absolute bottom-[24px]`,
};

const MyDiscussionCard: React.FC<{ discussion: myDiscussion }> = ({
  discussion,
}) => {
  const router = useRouter();

  const localISOString = new DateConvertor(
    discussion?.createdAt,
  ).convertToLocalISOString();
  const dateConvertor = new DateConvertor(localISOString);

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/discussion/${discussion.discussionId}`);
  };

  return (
    <div
      className={styles.cardBox}
      onClick={onClickHandler}
      data-testid={`discussion${discussion.discussionId}`}
    >
      <ProgressStatus status={discussion.status} />
      <div className="h-[280px]">
        <div className={styles.contentsWrapper}>
          <div className={styles.header}>
            <p className={styles.nickname}>{discussion?.nickname}</p>
            <h2>{dateConvertor.formatWithLongDate()}</h2>
          </div>
          <h1 className={styles.title}>{discussion.title}</h1>
          {discussion.status === "end" && (
            <span>{`남은 시간 ${discussion?.remainingTime}`}</span>
          )}
          <div className={styles.categories}>
            {/* {discussion.categories.map((category) => (
              <Button
                key={`${discussion.discussionId}${category}`}
                color="grey"
                size="tag"
              >
                # {category}
              </Button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiscussionCard;
