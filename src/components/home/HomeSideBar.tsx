import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

const keywordList = ["프론트엔드", "백엔드", "풀스택", "웹 개발자"];
const HomeSideBar = () => {
  return (
    <div className="w-[380px] h-full">
      <article
        className={`${BG_COLOR.general02} ${BORDER_COLOR.container} px-[15px] py-[24px] flex gap-3 flex-wrap content-start h-[500px]`}
      >
        {keywordList.map((keyword) => (
          <Button size="category" color="white" key={keyword} rounded>
            #{keyword}
          </Button>
        ))}
      </article>
    </div>
  );
};

export default HomeSideBar;
