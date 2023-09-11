"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

import EditBtn from "./EditBtn";

interface props {
  position: "top" | "bottom" | "disussion";
  type: "tech" | "discussion";
}

const LoggedSide: React.FC<props> = ({ position, type }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDLIST],
    queryFn: async () => await axios.get("/api/usercategories"),
  });
  const keywordList = data?.data;

  const heightValue = `${
    position === "bottom"
      ? "h-[500px] pb-0"
      : position === "top"
      ? "h-[409px]"
      : "h-[280px]"
  }`;
  const styles = {
    wrapper: `relative flex flex-col w-[380px] px-[16px] py-[24px] overflow-y-auto ${BG_COLOR.general02} ${BORDER_COLOR.container} ${heightValue}`,
    h1: `font-hack text-[20px] mb-[32px]`,
    keywordDiv: `flex grow gap-3 flex-wrap content-start ${
      position === "bottom" && "pb-4"
    }`,
  };

  return (
    <div className={`${styles.wrapper}`}>
      <h1 className={styles.h1}>My Keyword</h1>
      <div className={`${styles.keywordDiv}`}>
        {keywordList?.map((keyword: string) => (
          <Link key={`logged${keyword}`} href={`/${type}?keyword=${keyword}`}>
            <Button size="category" color="category" rounded>
              #{keyword}
            </Button>
          </Link>
        ))}
      </div>
      <EditBtn position={position} />
    </div>
  );
};

export const LoggedSideBar = React.memo(LoggedSide);
