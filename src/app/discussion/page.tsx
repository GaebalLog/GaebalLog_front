"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Button from "@/components/designSystem/Button";
import DiscussionSideBar from "@/components/discussion/DiscussionSideBar";
import Discussion from "@/components/commonUI/Discussion";

const sortTab = ["정확도 순", "조회 순", "최신순"] as const;

const DiscussionPage = () => {
  const [tab, setTab] = React.useState<(typeof sortTab)[number]>("정확도 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/chatlists/1"),
  });
  const discussionList = data?.data.discussions;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <DiscussionSideBar />
      <div>
        <div className="flex justify-end gap-[16px] mb-[16px]">
          {sortTab.map((item) => (
            <Button
              key={`${item}tab`}
              size="tab"
              color={tab === item ? "black" : "lightGrey"}
              onClick={() => setTab(item)}
              border
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-[20px]">
          {discussionList?.map((discussion: discussion) => {
            return (
              <Discussion
                discussion={discussion}
                key={`chatlist${discussion.chatListId}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
