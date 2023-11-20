import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Link from "next/link";

import { BG_COLOR, BORDER_COLOR } from "@/config/constants/colors";
import useIcon from "@/hooks/useIcon";

const styles = {
  container: `${BG_COLOR.general02} ${BORDER_COLOR.container} px-[16px] py-[24px] h-[280px] overflow-auto`,
  title: "font-hack text-[20px] mb-[32px]",
  listBox: "flex justify-between items-center px-[16px] py-[15px]",
};

const MyDiscussion = () => {
  const { data } = useQuery({
    queryKey: ["mydiscussionlist"],
    queryFn: async () => await axios.get("/api/users/chatlists"),
  });
  const chatList = data?.data.chatList;

  const { getIcon } = useIcon();
  const arrow = getIcon("arrow", 8, 12);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Discussion</h1>
      <div>
        {chatList?.map((item: chatItemAtSide) => {
          const { chatListId, title } = item;
          return (
            <div key={chatListId} className={styles.listBox}>
              <div>{title}</div>
              <Link href={`/discussion/${chatListId}`}>{arrow}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const MyDsicussionList = React.memo(MyDiscussion);
