"use client";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import Post from "@/components/commonUI/Post";
import LoggedSideBar from "@/components/commonUI/LoggedSideBar";
import { isLoggedInAtom } from "@/constants/global/atoms";
import SideBar from "@/components/commonUI/SideBar";
import { modalAtom } from "@/constants/global/atoms";

import mainImage from "../../../public/assets/images/home/main.png";

// eslint-disable-next-line @typescript-eslint/naming-convention
const KeywordSearch = dynamic(
  () => import("../../components/modal/keywordSearch/KeywordSearch"),
);

const HomePage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isModal = useRecoilValue<boolean>(modalAtom);

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
        {isLoggedIn ? <LoggedSideBar sticky /> : <SideBar sticky />}
        <div className="flex flex-col gap-[20px]">
          {postList?.map((post: post) => {
            return <Post post={post} key={post.postId} />;
          })}
        </div>
      </div>
      {isModal && <KeywordSearch />}
    </div>
  );
};

export default HomePage;
