"use client";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { TEXT_COLOR } from "@/constants/global/colors";
import Post from "@/components/commonUI/Post";
import Button from "@/components/designSystem/Button";
import SideBar from "@/components/commonUI/SideBar";
import { LoggedSideBar } from "@/components/commonUI/LoggedSideBar";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";

import mainImage from "../../../public/assets/images/home/main.png";

const loggedInUI = ["전체글", "My Friends' Articles"];

const HomePage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/posts/all"),
  });
  const postList = data?.data.posts;
  const [tab, setTab] = React.useState<string>("전체글");

  return (
    <div className="w-[1632px] flex flex-col">
      <Image
        className="mt-[20px] mb-[20px]"
        src={mainImage}
        width={1632}
        height={400}
        alt="메인 이미지"
      />
      <div className="flex justify-between">
        {isLoggedIn ? (
          <LoggedSideBar position="bottom" sticky />
        ) : (
          <SideBar sticky />
        )}
        <div>
          {isLoggedIn && (
            <div className="relative flex gap-[40px] pt-[34px] mb-[20px]">
              <Link href="/post/tech">
                <button
                  className={`absolute top-0 right-0 text-[24px] ${TEXT_COLOR.primary}`}
                >
                  + Create Article
                </button>
              </Link>
              {isLoggedIn &&
                loggedInUI.map((item) => (
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
          <div className="flex flex-col gap-[20px]">
            {postList?.map((post: post) => {
              return <Post post={post} key={`postlist${post.postId}`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
