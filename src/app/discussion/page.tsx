"use client";
import React from "react";

import DiscussionSideBar from "@/components/discussion/DiscussionSideBar";
import Discussion from "@/components/commonUI/Discussion";
import SortBar from "@/components/commonUI/SortBar";
import InfiniteScroll from "@/components/observing/InfiniteScroll";
import useGetDiscussion from "@/hooks/discussionAPI/useGetDiscussion";
import useToggleDiscussionLike from "@/hooks/discussionAPI/useToggleDiscussionLike";
import ResultNotFound from "@/components/commonUI/ResultNotFound";

const DiscussionPage = () => {
  const [tab, setTab] = React.useState<sortTab>("조회 순");
  const [discussionList, setDiscussionList] = React.useState<discussion[]>([]);
  const sort = tab === "조회 순" ? "views" : "createdAt";

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetDiscussion({ sort });
  React.useEffect(() => {
    const list = data?.pages.flatMap((page) => page?.data.discussions) || [];
    setDiscussionList(list);
  }, [data]);
  const toggleLikeHandler = (discussionId: number) => {
    setDiscussionList((prev) =>
      prev.map((discussion) => {
        if (discussion.discussionId !== discussionId) return discussion;
        const likedStatus = !discussion.liked;
        return {
          ...discussion,
          liked: likedStatus,
          like: likedStatus ? discussion.like + 1 : discussion.like - 1,
        };
      }),
    );
  };
  const { mutate: likeHandler } = useToggleDiscussionLike({
    onToggle: toggleLikeHandler,
  });
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <DiscussionSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <InfiniteScroll
          onIntersect={fetchNextPage}
          canLoad={Boolean(hasNextPage && !isFetchingNextPage)}
        >
          <ResultNotFound data={discussionList?.length} />
          <div className="flex flex-col items-end gap-[20px]">
            {discussionList?.map((discussion: discussion) => {
              return (
                <Discussion
                  discussion={discussion}
                  likeHandler={likeHandler}
                  key={`discussionList${discussion.discussionId}`}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default DiscussionPage;
