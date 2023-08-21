import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";

import MyPost from "../MyPost";

const MyWritten = () => {
  const [tab, setTab] = React.useState<sortTab>("정확도 순");

  const { data } = useQuery({
    queryKey: ["myWritten"],
    queryFn: async () => await axios.get("/api/mypage/mywritten"),
  });
  const postList = data?.data.posts;
  return (
    <div className="flex w-full flex-col px-[44px] pb-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="flex gap-[24px]">
        {postList?.map((post: post) => {
          return <MyPost key={`post${post.postId}`} post={post} />;
        })}
      </article>
    </div>
  );
};

export default MyWritten;
