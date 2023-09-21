import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { mypageApi } from "@/api/mypageApi";

import MyNeightborProfile from "./element/MyNeighborProfile";

const BannedByMe = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.BLOCKUSER],
    queryFn: async () => await mypageApi.getBlockUser(),
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
