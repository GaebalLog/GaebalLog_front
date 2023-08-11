"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import Button from "@/components/designSystem/Button";

const sortTab = ["정확도 순", "조회 순", "최신순"] as const;

const DiscussionPage = () => {
  const [tab, setTab] = React.useState<(typeof sortTab)[number]>("정확도 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/posts/all"),
  });
  const postList = data?.data;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
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
          {postList?.map((post: post) => {
            return <Post post={post} key={post.postId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
