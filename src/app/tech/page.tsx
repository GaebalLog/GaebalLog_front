"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";

import Post from "@/components/commonUI/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/commonUI/SortBar";
import InfiniteScroll from "@/components/observing/InfiniteScroll";
import useGetPost from "@/hooks/postAPI/useGetPost";
import { postAPI } from "@/api/postAPI";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const [postList, setPostList] = React.useState<postDetail[]>([]);
  const sort = tab === "조회 순" ? "views" : "created_at";
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPost({
    sort,
  });
  const { mutate } = useMutation({
    mutationFn: postAPI.toggleBookmark,
    onMutate: (postId: number) => {
      setPostList((prev) => {
        return prev.map((post) =>
          post.post_id === postId
            ? { ...post, bookmarked: !post.bookmarked }
            : post,
        );
      });
    },
    onError: (error, postId) => {
      setPostList((prev) =>
        prev.map((post) =>
          post.post_id === postId
            ? { ...post, bookmarked: !post.bookmarked }
            : post,
        ),
      );
    },
  });
  const bookmarkHandler = (postId: number) => {
    mutate(postId);
  };
  React.useEffect(() => {
    const list = data?.pages.flatMap((page) => page?.data.posts) || [];
    setPostList(list);
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
              return (
                <Post
                  post={post}
                  key={post.post_id}
                  bookmarkHandler={bookmarkHandler}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TechPage;
