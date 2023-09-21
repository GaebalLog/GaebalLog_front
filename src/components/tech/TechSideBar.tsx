import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import { isLoggedInAtom } from "@/hooks/useUserAuth";

import SideBar from "../commonUI/SideBar";
import Button from "../designSystem/Button";
import { LoggedSideBar } from "../commonUI/LoggedSideBar";
import { NeighborArticleList } from "../commonUI/NeighborArticleList";
import StickyStyle from "../commonUI/StickyStyle";

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
