"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";

const TechPage = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/posts/all"),
  });
  const postList = data?.data;
  return (
    <div className="w-[1632px] flex justify-between">
      <TechSideBar />
      <div className="flex flex-col gap-[20px]">
        {postList?.map((post: post) => {
          return <Post post={post} key={post.postId} />;
        })}
      </div>
    </div>
  );
};

export default TechPage;
