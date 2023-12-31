"use client";
import React from "react";

import Post from "@/components/UI/container/Post";
import TechSideBar from "@/components/tech/TechSideBar";
import SortBar from "@/components/UI/features/SortBar";
import InfiniteScroll from "@/components/UI/features/InfiniteScroll";
import useGetPost from "@/hooks/postAPI/useGetPost";
import useToggleBookmark from "@/hooks/postAPI/useToggleBookmark";
import useToggleLike from "@/hooks/postAPI/useToggleLike";
import ResultNotFound from "@/components/UI/status/ResultNotFound";

const TechPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const [postList, setPostList] = React.useState<postDetail[]>([]);
  const sort = tab === "조회 순" ? "views" : "createdAt";
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPost({
    sort,
  });
  React.useEffect(() => {
    const list = data?.pages.flatMap((page) => page?.data.posts) || [];
    setPostList(list);
  }, [data]);
  const toggleBookmark = (postId: number) => {
    setPostList((prev) => {
      return prev.map((post) =>
        post.postId === postId
          ? { ...post, bookmarked: !post.bookmarked }
          : post,
      );
    });
  };
  const { mutate: bookmarkHandler } = useToggleBookmark({
    onToggle: toggleBookmark,
  });
  const toggleLikeHandler = (postId: number) => {
    setPostList((prev) =>
      prev.map((post) => {
        if (post.postId !== postId) return post;
        const likedStatus = !post.liked;
        return {
          ...post,
          liked: likedStatus,
          like: likedStatus ? post.like + 1 : post.like - 1,
        };
      }),
    );
  };
  const { mutate: likeHandler } = useToggleLike({
    onToggle: toggleLikeHandler,
  });

  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <TechSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <InfiniteScroll
          onIntersect={fetchNextPage}
          canLoad={Boolean(hasNextPage && !isFetchingNextPage)}
        >
          <ResultNotFound data={postList?.length} />
          <div className="relative flex flex-col items-end gap-[20px]">
            {postList?.map((post: postDetail) => {
              return (
                <Post
                  post={post}
                  key={post.postId}
                  bookmarkHandler={bookmarkHandler}
                  likeHandler={likeHandler}
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
