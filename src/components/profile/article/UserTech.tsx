import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";
import MyPost from "@/components/mypage/elements/MyPost";
import { QUERY_KEYS } from "@/constants/global/querykeys";

const UserTech: React.FC<{ params: string }> = ({ params }) => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORWRITTEN, params],
    queryFn: async () => await axios.get(`/api/users/tech/${params}`),
  });
  const postList = data?.data.posts;

  return (
    <div className="flex w-full h-full flex-col px-[44px] py-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="grid grid-cols-3 gap-[86px] mt-[11px] overflow-auto">
        {postList?.map((post: post) => {
          return <MyPost key={`post${post.postId}`} post={post} />;
        })}
      </article>
    </div>
  );
};

export default UserTech;
