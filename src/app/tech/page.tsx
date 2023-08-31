"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/commonUI/SortBar";
import { postAPI } from "@/api/postAPI";

import type { postDetail } from "./[postId]/page";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const loadMoreRef = React.useRef(null);

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
  console.log(data);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.7,
      },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <div className="relative flex flex-col items-end gap-[20px]">
          {postList?.map((post: postDetail) => {
            return <Post post={post} key={post.post_id} />;
          })}
          <div ref={loadMoreRef} className="absolute bottom-[50px]" />
        </div>
      </div>
    </div>
  );
};

export default TechPage;
