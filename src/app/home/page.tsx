"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import Post from "@/components/commonUI/Post";
import { TEXT_COLOR } from "@/config/constants/colors";
import { LoggedSideBar } from "@/components/commonUI/LoggedSideBar";
import Button from "@/components/designSystem/Button";
import SideBar from "@/components/commonUI/SideBar";
import StickyStyle from "@/components/commonUI/StickyStyle";
import useGetPost from "@/hooks/postAPI/useGetPost";
import InfiniteScroll from "@/components/observing/InfiniteScroll";
import useToggleBookmark from "@/hooks/postAPI/useToggleBookmark";
import useToggleLike from "@/hooks/postAPI/useToggleLike";
import { isLoggedInAtom } from "@/hooks/useUserAuth";
import MainBanner from "@/components/commonUI/MainBanner";
import ResultNotFound from "@/components/commonUI/ResultNotFound";

const userTab = ["전체글", "My Friends' Articles"];

const HomePage = () => {
  const [tab, setTab] = React.useState<sortTab>("전체글");
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const [postList, setPostList] = React.useState<postDetail[]>([]);
  const sort = tab === "전체글" ? "views" : "neighbor";
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
  const { mutate } = useToggleBookmark({ onToggle: toggleBookmark });
  const bookmarkHandler = (postId: number) => {
    mutate(postId);
  };
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
    <div className="w-[1632px] flex flex-col">
      <MainBanner />
      <div className="flex justify-between gap-[32px]">
        <StickyStyle>
          {isLoggedIn ? (
            <LoggedSideBar type="tech" position="bottom" />
          ) : (
            <SideBar sticky />
          )}
        </StickyStyle>
        <div className="w-full">
          {isLoggedIn && (
            <div className="relative flex gap-[40px] pt-[34px] mb-[20px]">
              <Link href="/tech/create">
                <button
                  className={`absolute top-0 right-0 text-[24px] ${TEXT_COLOR.primary}`}
                >
                  + Create Article
                </button>
              </Link>
              {isLoggedIn &&
                userTab.map((item) => (
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
          )}
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
                    key={`post ${post.postId}`}
                    bookmarkHandler={bookmarkHandler}
                    likeHandler={likeHandler}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
