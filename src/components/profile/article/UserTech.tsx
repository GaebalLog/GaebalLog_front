import { useQuery } from "@tanstack/react-query";
import React from "react";

import SortBar from "@/components/UI/features/SortBar";
import MyPost from "@/components/mypage/article/MyWritten/elements/MyPost";
import { QUERY_KEYS } from "@/config/query_config";
import { authAPI } from "@/config/api/authAPI";

const UserTech: React.FC<{ params: string }> = ({ params }) => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const queryKey = [QUERY_KEYS.NEIGHBORWRITTEN, params];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => await authAPI.userPost(params),
  });
  const postList = data?.data;

  return (
    <div className="flex w-full h-full flex-col px-[44px] py-[24px]">
      <SortBar tab={tab} setTab={setTab} option="mypage" />
      <article className="grid grid-cols-3 gap-[86px] mt-[11px] overflow-auto">
        {postList?.map((post: myPost) => {
          return (
            <MyPost
              key={`post${post.postId}`}
              post={post}
              queryKey={queryKey}
            />
          );
        })}
      </article>
    </div>
  );
};

export default UserTech;
