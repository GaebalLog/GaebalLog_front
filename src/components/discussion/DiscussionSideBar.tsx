import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import SideBar from "../commonUI/SideBar";
import Button from "../designSystem/Button";
import { LoggedSideBar } from "../commonUI/LoggedSideBar";
import { NeighborArticleList } from "../commonUI/NeighborArticleList";
import { isLoggedInAtom } from "../provider/SettingsProvider";

import { MyDsicussionList } from "./MyDsicussionList";

const DiscussionSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col gap-[16px]">
          <Link href="/post/discussion">
            <Button
              size="middleCreate"
              color="white"
              border
              className="rounded-[3px] w-[380px]"
            >
              + Create Discussion
            </Button>
          </Link>
          <MyDsicussionList />
          <LoggedSideBar type="discussion" position="disussion" />
          <NeighborArticleList discussion />
        </div>
      ) : (
        <SideBar />
      )}
    </div>
  );
};

export default DiscussionSideBar;
