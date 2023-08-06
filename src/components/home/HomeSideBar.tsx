"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

const HomeSideBar = () => {
  const { data } = useQuery({
    queryKey: ["keywordList"],
    queryFn: async () => await axios.get("/api/usercategories"),
  });
  const keywordList = data?.data;
  return (
    <div className="w-[380px] h-full">
      <article
        className={`${BG_COLOR.general02} ${BORDER_COLOR.container} px-[15px] py-[24px] flex gap-3 flex-wrap content-start h-[500px]`}
      >
        {keywordList?.map((keyword: string) => (
          <Button size="category" color="white" key={keyword} rounded>
            #{keyword}
          </Button>
        ))}
      </article>
    </div>
  );
};

export default HomeSideBar;
