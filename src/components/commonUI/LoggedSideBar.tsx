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
  height?: `h-[${string}]`;
  sticky?: boolean;
  type: "tech" | "discussion";
}
const colorSettings = `relative ${BG_COLOR.general02} ${BORDER_COLOR.container}`;

const LoggedSide: React.FC<props> = ({ height, sticky, position, type }) => {
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
  const styles = height
    ? sticky
      ? `w-[380px] sticky top-[114px] overflow-auto ${colorSettings} ${heightValue}`
      : `w-[380px] overflow-auto ${colorSettings} ${heightValue}`
    : sticky
    ? `w-[380px] sticky top-[114px] overflow-auto ${colorSettings} ${heightValue}`
    : `w-[380px] overflow-auto ${colorSettings} ${heightValue}`;

  return (
    <div className={styles}>
      <div className="px-[16px] py-[24px]">
        <h1 className="font-hack text-[24px] mb-[32px]">My Keyword</h1>
        <div className="flex gap-3 flex-wrap content-start">
          {keywordList?.map((keyword: string) => (
            <Link key={`logged${keyword}`} href={`/${type}?keyword=${keyword}`}>
              <Button size="category" color="white" rounded>
                #{keyword}
              </Button>
            </Link>
          ))}
          <EditBtn position={position} />
        </div>
      </div>
    </div>
  );
};

export const LoggedSideBar = React.memo(LoggedSide);
