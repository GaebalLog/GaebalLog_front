import React from "react";

import SortBar from "@/components/commonUI/SortBar";
import useGetMyWritten from "@/hooks/mypageAPI/useGetMyWritten";

import DropDown from "../../elements/DropDown";
import MyPost from "../../elements/MyPost";

import NoData from "./NoData";

type myWrttenType =
  | "내가 쓴 글"
  | "임시저장 글"
  | "내가 북마크한 글"
  | "내가 댓글 단 글"
  | "내가 좋아요 한 글";
const myWrittenTyep: myWrttenType[] = [
  "내가 쓴 글",
  "임시저장 글",
  "내가 북마크한 글",
  "내가 댓글 단 글",
  "내가 좋아요 한 글",
];

const MyWritten = () => {
  const [dropDownType, setDropDownType] =
    React.useState<myWrttenType>("내가 쓴 글");
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data, error } = useGetMyWritten(dropDownType);

  const postList = data?.data;

  return (
    <div className="flex w-full h-full flex-col px-[44px] pb-[24px]">
      <div className="flex">
        <DropDown<myWrttenType>
          tab="mydiscussions"
          types={myWrittenTyep}
          dropDownType={dropDownType}
          setDropDownType={setDropDownType}
        />
        <div className="self-end mb-[0.75px] ml-auto">
          <SortBar tab={tab} setTab={setTab} option="mypage" />
        </div>
      </div>
      {error?.response?.status === 404 ? (
        <NoData dropDownType={dropDownType} />
      ) : (
        <article className="grid grid-cols-4 gap-[24px] w-full h-full overflow-auto">
          {postList?.map((post: myPost) => {
            return <MyPost key={`post${post.postId}`} post={post} />;
          })}
        </article>
      )}
    </div>
  );
};

export default MyWritten;
