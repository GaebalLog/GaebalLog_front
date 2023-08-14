"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

import Button from "../designSystem/Button";
import LoadingSpinner from "../LoadingSpinner";

const styles = {
  container: `overflow-y-auto w-[1100px] h-[62%] p-4 ${BORDER_COLOR.button}`,
  header: {
    wrapper: `flex justify-between mb-2`,
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

interface chatroom {
  data: {
    chatRoomId: number;
    userId: number;
    socketRoom: [];
    ChatList: [];
    title: string;
    content: string;
    thumbnail: string;
    like: number;
    myParticipationTime: string;
    discussionEndTime: string;
    remainingTime: string;
  };
}

const RoomContents: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {
  const { data, isLoading } = useQuery<chatroom>({
    queryKey: ["chatRoom", chatRoomId],
    queryFn: () => axios.get(`/api/chatrooms/${chatRoomId}`),
  });

  const { getIcon } = useIcon();
  const like = getIcon("like", 18, 18);

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
        <Button size="tab" color="white" border>
          토의 나가기
        </Button>
      </header>
      <div className={styles.roomInfoBox.wrapper}>
        <figure className={styles.roomInfoBox.imageDiv}>
          <Image
            className="object-contain"
            src={data?.data.thumbnail ?? ""}
            alt="썸네일"
            fill
            sizes="660.5px"
          />
        </figure>
        <aside className={styles.roomInfoBox.aside}>
          <div>
            <Button size="withIcon" color="white" border rounded>
              <div>{like}</div>
              <span>{data?.data.like}</span>
            </Button>
          </div>
          <div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>나의 참가시간</strong>
              <span>{data?.data.myParticipationTime}</span>
            </div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>토의 종료 예정시간</strong>
              <span>{data?.data.discussionEndTime}</span>
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
    </section>
  );
};

export default RoomContents;
