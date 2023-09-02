"use client";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import { TEXT_COLOR } from "@/constants/global/colors";
import Post from "@/components/commonUI/Post";
import Button from "@/components/designSystem/Button";
import SideBar from "@/components/commonUI/SideBar";
import { LoggedSideBar } from "@/components/commonUI/LoggedSideBar";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";
import StickyStyle from "@/components/commonUI/StickyStyle";
import useGetPost from "@/hooks/postAPI/useGetPost";
import InfiniteScroll from "@/components/observing/InfiniteScroll";

import mainImage from "../../../public/assets/images/home/main.png";

const userTab = ["전체글", "My Friends' Articles"];

const HomePage = () => {
  const [tab, setTab] = React.useState<sortTab>("전체글");
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const sort = tab === "전체글" ? "views" : "neighbor";
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPost({
    sort,
  });
  const postList = React.useMemo(() => {
    return data?.pages.flatMap((page) => page?.data.posts) || [];
  }, [data]);

  return (
    <div className="w-[1632px] flex flex-col">
      <Image
        className="mt-[20px] mb-[20px]"
        src={mainImage}
        width={1632}
        height={400}
        alt="메인 이미지"
      />
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
              <Link href="/post/create/tech">
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
            <div className="relative flex flex-col items-end gap-[20px]">
              {postList?.map((post: postDetail) => {
                return <Post post={post} key={post.post_id} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
