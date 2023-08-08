"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import { modalAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

type WidthValue = `w-[${string}]`;

interface props {
  height?: WidthValue;
  sticky?: boolean;
}
const LoggedSideBar: React.FC<props> = ({ height, sticky }) => {
  const setIsModal = useSetRecoilState<boolean>(modalAtom);
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
      <h1>My Keyword</h1>
      <div
        className={`${BG_COLOR.general02} ${BORDER_COLOR.container} px-[15px] py-[24px] flex gap-3 flex-wrap content-start h-[500px]`}
      >
        {keywordList?.map((keyword: string) => (
          <Button size="category" color="white" key={keyword} rounded>
            #{keyword}
          </Button>
        ))}
        <button
          className="block text-white"
          onClick={() => setIsModal((prev) => !prev)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default LoggedSideBar;
