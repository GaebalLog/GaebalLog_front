import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageAPI } from "@/api/mypageAPI";

import MyNeightborProfile from "./profile/MyNeighborProfile";

const BannedByMe = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.BLOCKUSER],
    queryFn: async () => await mypageAPI.getBlockUser(),
  });
  const neighborList: neighborItem[] = data?.data;

  return (
    <React.Fragment>
      {neighborList?.map((item: neighborItem) => {
        const { nickname, profileImage, userId } = item;
        return (
          <MyNeightborProfile
            key={`myneighborProfile${item.userId}`}
            nickname={nickname}
            profileImage={profileImage}
            userId={userId}
            bannned
          />
        );
      })}
    </React.Fragment>
  );
};

export default BannedByMe;
