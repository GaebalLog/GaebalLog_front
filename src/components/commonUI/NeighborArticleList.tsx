import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import NeightborProfile from "./NeightborProfile";

interface props {
  discussion?: boolean;
}
const NeighborArticle: React.FC<props> = ({ discussion }) => {
  const { data } = useQuery({
    queryKey: ["neighborlist"],
    queryFn: async () => await axios.get("/api/neighbors"),
  });
  const neighborList: neighborItem[] = data?.data;
  return (
    <div
      className={`${BG_COLOR.general02} ${
        BORDER_COLOR.container
      } px-[16px] py-[24px] ${
        discussion ? "h-[280px]" : "h-[409px]"
      } overflow-auto`}
    >
      <h1 className="font-hack text-[20px] mb-[32px]">My Friend’s</h1>
      {neighborList?.map((item: neighborItem) => {
        const { nickname, profileImage, userId } = item;
        return (
          <NeightborProfile
            key={`neighborProfile${item.userId}`}
            nickname={nickname}
            profileImage={profileImage}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

export const NeighborArticleList = React.memo(NeighborArticle);
