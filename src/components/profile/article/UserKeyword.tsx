import { useQuery } from "@tanstack/react-query";
import React from "react";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { authAPI } from "@/api/authAPI";

const UserKeyword: React.FC<{ params: string }> = ({ params }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORKEYWORD, params],
    queryFn: async () => await authAPI.userKeyword(params),
  });
  console.log(data?.data);

  return <div>{params}</div>;
};

export default UserKeyword;
