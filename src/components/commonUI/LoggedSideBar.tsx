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
      ? "h-[500px]"
      : position === "top"
      ? "h-[409px]"
      : "h-[280px]"
  }`;
  const divHeight = `${
    position === "bottom"
      ? "h-[355px]"
      : position === "top"
      ? "h-[250px]"
      : "h-[150px]"
  }`;
  const styles = {
    wrapper: `relative w-[380px] px-[16px] py-[24px] ${BG_COLOR.general02} ${BORDER_COLOR.container} ${heightValue}`,
    h1: `font-hack text-[24px] mb-[32px]`,
    keywordDiv: `flex gap-3 flex-wrap content-start ${divHeight} overflow-hidden`,
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>My Keyword</h1>
      <div className={styles.keywordDiv}>
        {keywordList?.map((keyword: string) => (
          <Link key={`logged${keyword}`} href={`/${type}?keyword=${keyword}`}>
            <Button size="category" color="category" rounded>
              #{keyword}
            </Button>
          </Link>
        ))}
        <EditBtn position={position} />
      </div>
    </div>
  );
};

export const LoggedSideBar = React.memo(LoggedSide);
