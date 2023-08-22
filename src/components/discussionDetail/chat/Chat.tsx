"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Button from "@/components/designSystem/Button";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";

import ChatItem from "./ChatItem";

const styles = {
  container: `overflow-y-auto relative flex flex-col justify-between w-[493px] h-full ${BORDER_COLOR.button} ${BG_COLOR.primary}`,
  chatList: `flex flex-col items-center p-4`,
  inputBox: {
    wrapper: `sticky bottom-0 flex h-[77px] p-4 z-10 ${BG_COLOR.primary}`,
    input: `w-[367px] h-[45px] mr-2 py-3 px-4 ${BG_COLOR.general03} ${TEXT_COLOR.primary}`,
    button: `flex-shrink-0 h-[45px]`,
  },
};

const Chat: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {
  const { data } = useQuery<{ data: chat[] }>({
    queryKey: ["chats", chatRoomId],
    queryFn: () => axios.get(`/api/chat/${chatRoomId}`),
  });

  return (
    <section className={styles.container}>
      <ul className={styles.chatList}>
        {data?.data.map((chat) => (
          <li key={chat.chatId}>
            <ChatItem {...chat} />
          </li>
        ))}
      </ul>
      <div className={styles.inputBox.wrapper}>
        <input className={styles.inputBox.input} />
        <Button
          className={styles.inputBox.button}
          size="tab"
          color="white"
          border
        >
          전송
        </Button>
      </div>
    </section>
  );
};

export default Chat;
