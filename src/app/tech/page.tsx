"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/commonUI/SortBar";
import { postAPI } from "@/api/postAPI";
import InfiniteScroll from "@/components/observing/InfiniteScroll";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const sort = tab === "조회 순" ? "views" : "created_at";
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.POSTLIST_HOME, sort],
      queryFn: ({ pageParam = 1 }) => postAPI.getAll(sort, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data.hasMore ? allPages.length + 1 : undefined;
      },
    });
  const postList = React.useMemo(() => {
    return data?.pages.flatMap((page) => page?.data.posts) || [];
  }, [data]);

  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <InfiniteScroll
          onIntersect={fetchNextPage}
          canLoad={Boolean(hasNextPage && !isFetchingNextPage)}
        >
          <div className="relative flex flex-col items-end gap-[20px]">
            {postList?.map((post: postDetail) => {
              return <Post post={post} key={post.post_id} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TechPage;
