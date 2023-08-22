import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";

import MyDiscussion from "../MyDiscussion";

const Mydiscussions = () => {
  const [tab, setTab] = React.useState<sortTab>("정확도 순");

  const { data } = useQuery({
    queryKey: ["myWritten"],
    queryFn: async () => await axios.get("/api/mypage/mydiscussion"),
  });
  const discussionList = data?.data.discussions as discussions;
  console.log(discussionList);
  return (
    <div className="flex w-full h-full flex-col px-[44px] py-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="flex gap-[24px]">
        {discussionList?.map((discussion: discussion) => {
          return (
            <MyDiscussion
              key={`post${discussion.chatListId}`}
              discussion={discussion}
            />
          );
        })}
      </article>
    </div>
  );
};

export default Mydiscussions;
