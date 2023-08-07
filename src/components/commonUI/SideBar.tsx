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
}
const SideBar: React.FC<props> = ({ height }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDLIST],
    queryFn: async () => await axios.get("/api/search/trending"),
  });
  const keywordList = data?.data;
  const styles = height
    ? `w-[380px] ${height} sticky top-[10px]}`
    : "w-[380px] h-full sticky top-[10px]";
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

export default SideBar;
