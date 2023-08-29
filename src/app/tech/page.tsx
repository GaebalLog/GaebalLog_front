"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/commonUI/SortBar";
import { postAPI } from "@/api/postAPI";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("정확도 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await postAPI.getAll(),
  });
  const postList = data?.data;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <div className="flex flex-col items-end gap-[20px]">
          {postList?.map((post: post) => {
            return <Post post={post} key={post.postId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TechPage;
