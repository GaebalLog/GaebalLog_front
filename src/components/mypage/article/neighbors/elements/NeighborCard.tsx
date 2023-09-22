import React from "react";

import useGetNeighbor from "@/hooks/mypageAPI/useGetNeighbor";

import NeighborProfile from "./NeighborProfile";

const NeighborCard: React.FC<{
  type: "addedByMe" | "addedByYou" | "addedByBoth" | "bannedByMe";
}> = ({ type }) => {
  const { data } = useGetNeighbor(type);
  const neighborList: neighborItem[] = data?.data;

  return (
    <React.Fragment>
      {neighborList?.map(({ nickname, profileImage, userId }: neighborItem) => {
        return (
          <NeighborProfile
            key={`myneighborProfile${userId}`}
            nickname={nickname}
            profileImage={profileImage}
            userId={userId}
            bannned={type === "bannedByMe"}
          />
        );
      })}
    </React.Fragment>
  );
};

export default NeighborCard;
