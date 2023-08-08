"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

type WidthValue = `w-[${string}]`;

interface props {
  height?: WidthValue;
  sticky?: boolean;
}
const LoggedSideBar: React.FC<props> = ({ height, sticky }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDLIST],
    queryFn: async () => await axios.get("/api/usercategories"),
  });
  const keywordList = data?.data;

  const styles = height
    ? sticky
      ? `w-[380px] ${height} sticky top-[104px]}`
      : `w-[380px] ${height}`
    : sticky
    ? "w-[380px] h-full sticky top-[104px]"
    : `w-[380px] h-full`;

  return (
    <div className={styles}>
      <div
        className={`${BG_COLOR.general02} ${BORDER_COLOR.container} px-[15px] py-[24px] flex gap-3 flex-wrap content-start h-[500px]`}
      >
        {keywordList?.map((keyword: string) => (
          <Button size="category" color="white" key={keyword} rounded>
            #{keyword}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LoggedSideBar;
