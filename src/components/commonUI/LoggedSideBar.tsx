"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { modalAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

interface props {
  position: "top" | "bottom" | "disussion";
  height?: `w-[${string}]`;
  sticky?: boolean;
}
const colorSettings = `relative ${BG_COLOR.general02} ${BORDER_COLOR.container}`;

const LoggedSide: React.FC<props> = ({ height, sticky, position }) => {
  const setIsModal = useSetRecoilState<boolean>(modalAtom);
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

  const editPosition =
    position === "top" || position === "disussion"
      ? "top-[26px]"
      : "bottom-[16px]";
  const buttonStyles = `${TEXT_COLOR.primary} ${
    position === "bottom" ? "text-[24px]" : "text-[16px]"
  } absolute ${editPosition} right-[25px]`;

  return (
    <div className={styles}>
      <div className="px-[16px] py-[24px]">
        <h1 className="font-hack text-[24px] mb-[32px]">My Keyword</h1>
        <div className="flex gap-3 flex-wrap content-start">
          {keywordList?.map((keyword: string) => (
            <Button size="category" color="white" key={keyword} rounded>
              #{keyword}
            </Button>
          ))}
          <button
            className={buttonStyles}
            onClick={() => setIsModal((prev) => !prev)}
          >
            + Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoggedSideBar = React.memo(LoggedSide);
