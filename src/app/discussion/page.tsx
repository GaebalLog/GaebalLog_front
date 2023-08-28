"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import DiscussionSideBar from "@/components/discussion/DiscussionSideBar";
import Discussion from "@/components/commonUI/Discussion";
import SortBar from "@/components/commonUI/SortBar";

const DiscussionPage = () => {
  const [tab, setTab] = React.useState<sortTab>("정확도 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/chatlists/1"),
  });
  const discussionList = data?.data.discussions;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <DiscussionSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <div className="flex flex-col items-end gap-[20px]">
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
