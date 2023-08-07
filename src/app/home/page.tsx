"use client";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import LoggedSideBar from "@/components/commonUI/LoggedSideBar";
import { isLoggedInAtom } from "@/constants/global/atoms";
import SideBar from "@/components/commonUI/SideBar";

import mainImage from "../../../public/assets/images/home/main.png";

const HomePage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTLIST_HOME],
    queryFn: async () => await axios.get("/api/posts/all"),
  });
  const postList = data?.data;

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
        {isLoggedIn ? <LoggedSideBar /> : <SideBar />}
        <div className="flex flex-col gap-[20px]">
          {postList?.map((post: post) => {
            return <Post post={post} key={post.postId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
