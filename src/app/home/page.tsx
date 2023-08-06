"use client";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HomeSideBar from "@/components/home/HomeSideBar";
import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";

const HomePage = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/posts/all"),
  });
  const postList = data?.data;
  return (
    <div className="w-[1632px] flex flex-col">
      <Image src={""} width={1632} height={400} alt="메인 이미지" />
      <div>
        <HomeSideBar />
        <div>
          {postList?.map((post: post) => {
            return <Post post={post} key={post.postId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
