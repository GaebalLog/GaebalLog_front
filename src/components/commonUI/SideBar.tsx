"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

type WidthValue = `w-[${string}]`;

interface props {
  height?: WidthValue;
  sticky?: boolean;
}
const SideBar: React.FC<props> = ({ height, sticky }) => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await axios.get("/api/categories"),
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
        className={`${BG_COLOR.general02} ${BORDER_COLOR.container} px-[16px] py-[24px] h-[500px]`}
      >
        <h1 className="font-hack text-[24px] mb-[32px]">Trend Keyword</h1>
        <div className="relative flex gap-3 flex-wrap content-start h-[350px] overflow-hidden">
          {keywordList?.map((keyword: string) => (
            <Button
              size="category"
              color="category"
              key={`side${keyword}`}
              rounded
            >
              #{keyword}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
