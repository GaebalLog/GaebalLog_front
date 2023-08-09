"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { modalAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

type WidthValue = `w-[${string}]`;

interface props {
  position: "top" | "bottom";
  height?: WidthValue;
  sticky?: boolean;
}
const LoggedSideBar: React.FC<props> = ({ height, sticky, position }) => {
  const setIsModal = useSetRecoilState<boolean>(modalAtom);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDLIST],
    queryFn: async () => await axios.get("/api/usercategories"),
  });
  const keywordList = data?.data;

  const styles = height
    ? sticky
      ? `w-[380px] ${height} sticky top-[114px]}`
      : `w-[380px] ${height}`
    : sticky
    ? "w-[380px] h-full sticky top-[114px]"
    : `w-[380px] h-full`;

  const editPosition = position === "top" ? "top-[26px]" : "bottom-[16px]";

  return (
    <div className={styles}>
      <div
        className={`${BG_COLOR.general02} ${
          BORDER_COLOR.container
        } relative px-[15px] py-[24px] ${
          position === "bottom" ? "h-[500px]" : "h-[307px]"
        }`}
      >
        <h1 className="font-hack text-[24px] mb-[32px]">My Keyword</h1>
        <div className="flex gap-3 flex-wrap content-start">
          {keywordList?.map((keyword: string) => (
            <Button size="category" color="white" key={keyword} rounded>
              #{keyword}
            </Button>
          ))}
          <button
            className={`${TEXT_COLOR.primary} ${
              position === "bottom" ? "text-[24px]" : "text-[16px]"
            } absolute ${editPosition} right-[25px]`}
            onClick={() => setIsModal((prev) => !prev)}
          >
            + Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedSideBar;
