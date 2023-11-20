import { useQuery } from "@tanstack/react-query";
import React from "react";

import SortBar from "@/components/UI/features/SortBar";
import MyDiscussionCard from "@/components/mypage/article/MyDiscussion/MyDiscussionCard";
import { QUERY_KEYS } from "@/config/query_config";
import { authAPI } from "@/config/api/authAPI";

const UserDiscussion: React.FC<{ params: string }> = ({ params }) => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORDISCUSSION, params],
    queryFn: async () => await authAPI.userDiscussion(params),
  });
  const discussionList = data?.data;

  return (
    <div className="flex w-full h-full flex-col px-[44px] py-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="grid grid-cols-3 gap-[86px] mt-[11px] overflow-auto">
        {discussionList?.map((discussion: myDiscussion) => {
          return (
            <MyDiscussionCard
              key={`discussion${discussion.discussionId}`}
              discussion={discussion}
            />
          );
        })}
      </article>
    </div>
  );
};

export default UserDiscussion;
