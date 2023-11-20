import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import { isLoggedInAtom } from "@/hooks/useUserAuth";

import SideBar from "../UI/container/SideBar";
import Button from "../UI/buttons/base/Button";
import { LoggedSideBar } from "../UI/container/LoggedSideBar";
import { NeighborArticleList } from "../UI/common/NeighborArticleList";
import StickyStyle from "../UI/common/StickyStyle";

import { MyDsicussionList } from "./MyDsicussionList";

const DiscussionSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <StickyStyle>
      {isLoggedIn ? (
        <div className="flex flex-col gap-[16px]">
          <Link href="/discussion/create">
            <Button
              size="middleCreate"
              color="background"
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
    </StickyStyle>
  );
};

export default DiscussionSideBar;
