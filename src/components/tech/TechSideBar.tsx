import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import { isLoggedInAtom } from "@/hooks/useUserAuth";

import SideBar from "../UI/container/SideBar";
import Button from "../UI/buttons/base/Button";
import { LoggedSideBar } from "../UI/container/LoggedSideBar";
import { NeighborArticleList } from "../UI/common/NeighborArticleList";
import StickyStyle from "../UI/common/StickyStyle";

const TechSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <StickyStyle>
      {isLoggedIn ? (
        <div className="flex flex-col gap-[16px]">
          <Link href="/tech/create">
            <Button
              size="middleCreate"
              color="background"
              border
              className="rounded-[3px] w-[380px]"
            >
              + Create Article
            </Button>
          </Link>
          <LoggedSideBar type="tech" position="top" />
          <NeighborArticleList />
        </div>
      ) : (
        <SideBar />
      )}
    </StickyStyle>
  );
};

export default TechSideBar;
