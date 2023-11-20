import { useQuery } from "@tanstack/react-query";
import React from "react";

import { QUERY_KEYS } from "@/config/query_config";
import { authAPI } from "@/config/api/authAPI";

const UserKeyword: React.FC<{ params: string }> = ({ params }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORKEYWORD, params],
    queryFn: async () => await authAPI.userKeyword(params),
  });
  console.log(data?.data);

  return <div>{params}</div>;
};

export default UserKeyword;
