import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { TEXT_COLOR } from "@/constants/global/colors";

import MyNeightborProfile from "../MyNeighborProfile";

const MyNeighborList = () => {
  const { data } = useQuery({
    queryKey: ["neighborlist"],
    queryFn: async () => await axios.get("/api/neighbors"),
  });
  const neighborList: neighborItem[] = data?.data;
  return (
    <div className={`px-[54px] py-[40px] w-full h-full overflow-auto`}>
      <h1
        className={`font-hack text-[24px] mb-[32px] ${TEXT_COLOR.primary} font-bold`}
      >
        이웃관리
      </h1>
      <article className="flex flex-col gap-[16px]">
        {neighborList?.map((item: neighborItem) => {
          const { nickname, profileImage, userId } = item;
          return (
            <MyNeightborProfile
              key={`myneighborProfile${item.userId}`}
              nickname={nickname}
              profileImage={profileImage}
              userId={userId}
            />
          );
        })}
      </article>
    </div>
  );
};

export const MyNeighbors = React.memo(MyNeighborList);
