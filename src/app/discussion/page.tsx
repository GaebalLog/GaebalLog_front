"use client";
import React from "react";

import DiscussionSideBar from "@/components/discussion/DiscussionSideBar";
import Discussion from "@/components/commonUI/Discussion";
import SortBar from "@/components/commonUI/SortBar";
import InfiniteScroll from "@/components/observing/InfiniteScroll";
import useGetDiscussion from "@/hooks/discussionAPI/useGetDiscussion";

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
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <DiscussionSideBar />
      <div className="w-full">
        <SortBar tab={tab} setTab={setTab} />
        <InfiniteScroll
          onIntersect={fetchNextPage}
          canLoad={Boolean(hasNextPage && !isFetchingNextPage)}
        >
          <div className="flex flex-col items-end gap-[20px]">
            {discussionList?.map((discussion: discussion) => {
              return (
                <Discussion
                  discussion={discussion}
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
