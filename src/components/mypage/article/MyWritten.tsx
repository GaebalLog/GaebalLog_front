import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";

import MyPost from "../MyPost";
import DropDown from "../DropDown";

const myWrittenTyep = [
  "내가 북마크한 글",
  "내가 댓글 단 글",
  "내가 좋아요 한 글",
];

const MyWritten = () => {
  const [dropDownType, setDropDownType] = React.useState("내가 북마크한 글");
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data } = useQuery({
    queryKey: ["myWritten"],
    queryFn: async () => await axios.get("/api/mypage/mywritten"),
  });
  const postList = data?.data.posts;
  return (
    <div className="flex w-full h-full flex-col px-[44px] pb-[24px]">
      <div className="flex">
        <DropDown
          tab="mydiscussions"
          types={myWrittenTyep}
          dropDownType={dropDownType}
          setDropDownType={setDropDownType}
        />
        <div className="self-end mb-[0.75px] ml-auto">
          <SortBar tab={tab} setTab={setTab} option="mypage" />
        </div>
      </div>
      <article className="grid grid-cols-4 gap-[24px] overflow-auto">
        {postList?.map((post: post) => {
          return <MyPost key={`post${post.postId}`} post={post} />;
        })}
      </article>
    </div>
  );
};

export default MyWritten;
