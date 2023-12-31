"use client";

import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/config/constants/colors";
import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import useGetDetailDiscussion from "@/hooks/discussionAPI/useGetDetailDiscussion";
import DateConvertor from "@/utils/util-dateConvertor";

import LoadingSpinner from "../UI/status/LoadingSpinner";
import Modal from "../UI/modals/base/Modal";
import AuthorContentBtn from "../discussion/box/AuthorContentBtn";
import LikeDiscussionBtn from "../discussion/btn/LikeDiscussionBtn";
import ParticipantsBtn from "../discussion/btn/ParticipantsBtn";

const styles = {
  container: `relative overflow-y-auto w-[68.75rem] h-[62%] p-4 ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
  header: {
    wrapper: `flex justify-between items-center mb-2`,
    titleBox: `flex items-center`,
    titleLabel: `text-xl font-bold py-2 px-8 mr-[30px] ${BG_COLOR.inverse} ${TEXT_COLOR.inverse}`,
    title: `text-2xl font-bold`,
  },
  roomInfoBox: {
    wrapper: `flex justify-between h-[372px]`,
    imageDiv: `relative w-[660.5px] h-full`,
    aside: `flex flex-col justify-between w-[385px] h-full p-6 ${BG_COLOR.general02}`,
    timeInfo: `flex mt-5`,
  },
};

const RoomContents = () => {
  const [topLeft, setTopLeft] = React.useState({ top: "0px", left: "0px" });
  const { modal, toggleModal } = useModalController();
  const { data, isLoading } = useGetDetailDiscussion();
  const { getIcon } = useIcon();
  const more = getIcon("more", 5, 5);
  const dateConvertor = new DateConvertor(data?.data.endDate);

  const moreOptionModalHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTopLeft({
      top: `${rect.top + 30}px`,
      left: `${rect.left + 17}px`,
    });
    toggleModal("discussionMore");
  };

  if (isLoading)
    return (
      <section
        className={`flex justify-center items-center ${styles.container}`}
      >
        <LoadingSpinner />
      </section>
    );

  return (
    <section className={styles.container}>
      <header className={styles.header.wrapper}>
        <div className={styles.header.titleBox}>
          <div className={styles.header.titleLabel}>주제</div>
          <h1 className={styles.header.title}>{data?.data.title}</h1>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <button
            className="px-4"
            onClick={moreOptionModalHandler}
            data-testid="moreBtn"
          >
            {more}
          </button>
        </div>
      </header>
      <div className={styles.roomInfoBox.wrapper}>
        <div className={styles.roomInfoBox.imageDiv}>
          <div
            className="object-contain"
            dangerouslySetInnerHTML={{ __html: data?.data.thumbnail ?? "" }}
          />
        </div>
        <aside className={styles.roomInfoBox.aside}>
          <div className="flex gap-[20px] bottom-2 right-3">
            <LikeDiscussionBtn
              like={data?.data.like as number}
              liked={data?.data.liked as boolean}
            />
            <ParticipantsBtn count={data?.data.participants as number} />
          </div>
          <div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>나의 참가시간</strong>
              <span>{data?.data.elapsedDate}</span>
            </div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>토의 종료 예정시간</strong>
              <span>{dateConvertor.formatWithLongDateHour()}</span>
            </div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>남은시간</strong>
              <span>{data?.data.remainingTime}</span>
            </div>
          </div>
        </aside>
      </div>
      <div className="flex mt-5">
        <div className="flex-shrink-0">
          <div className={`${styles.header.titleLabel}`}>내용</div>
        </div>
        <div
          className="no-tailwind"
          dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
        />
      </div>
      {modal.discussionMore && (
        <Modal positionOption={topLeft} nonBackdrop>
          <div className={`flex flex-col ${BORDER_COLOR.button}`}>
            <AuthorContentBtn isAuthor={data?.data.isAuthor as boolean} />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default RoomContents;
