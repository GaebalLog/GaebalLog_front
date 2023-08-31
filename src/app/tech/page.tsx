"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/commonUI/SortBar";
import { postAPI } from "@/api/postAPI";

import type { postDetail } from "./[postId]/page";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const [page, setPage] = React.useState<number>(1);

  const sort = tab === "조회 순" ? "views" : "created_at";
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME, sort, page],
    queryFn: async () => await postAPI.getAll(sort, page),
  });
  const { data: infinite } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME, sort, page],
    queryFn: async () => await postAPI.getAll(sort, page),
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.hasMore) return setPage((prev) => prev + 1);
    },
  });
  console.log(infinite);
  const postList = data?.data.posts;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <div className="flex flex-col items-end gap-[20px]">
          {postList?.map((post: postDetail) => {
            return <Post post={post} key={post.post_id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TechPage;
