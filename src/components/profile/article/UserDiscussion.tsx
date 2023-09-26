import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";
import MyDiscussionCard from "@/components/mypage/article/MyDiscussion/MyDiscussionCard";
import { QUERY_KEYS } from "@/constants/global/querykeys";

const UserDiscussion: React.FC<{ params: string }> = ({ params }) => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORDISCUSSION, params],
    queryFn: async () => await axios.get(`/api/users/discussion/${params}`),
  });
  const discussionList = data?.data.discussions;

  return (
    <div className="flex w-full h-full flex-col px-[44px] py-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="grid grid-cols-3 gap-[86px] mt-[11px] overflow-auto">
        {discussionList?.map((discussion: beforeDiscussion) => {
          return (
            <MyDiscussionCard
              key={`discussion${discussion.chatListId}`}
              discussion={discussion}
            />
          );
        })}
      </article>
    </div>
  );
};

export default UserDiscussion;
