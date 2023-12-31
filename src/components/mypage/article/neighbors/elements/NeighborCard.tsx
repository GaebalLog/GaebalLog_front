import React from "react";

import useGetMyNeighbor from "@/hooks/mypageAPI/useGetMyNeighbor";

import NeighborProfile from "./NeighborProfile";

const NeighborCard: React.FC<{
  type: "addedByMe" | "addedByYou" | "addedByBoth" | "bannedByMe";
}> = ({ type }) => {
  const { data } = useGetMyNeighbor(type);
  const neighborList: neighborItem[] = data?.data;

  return (
    <React.Fragment>
      {neighborList?.map(({ nickname, imageUrl, userId }: neighborItem) => {
        return (
          <NeighborProfile
            key={`myneighborProfile${userId}`}
            nickname={nickname}
            imageUrl={imageUrl}
            userId={userId}
            bannned={type === "bannedByMe"}
          />
        );
      })}
    </React.Fragment>
  );
};

export default NeighborCard;
