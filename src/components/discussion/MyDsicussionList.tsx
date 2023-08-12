import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const MyDsicussion = () => {
  const { data } = useQuery({
    queryKey: ["mydiscussionlist"],
    queryFn: async () => await axios.get("/api/neighbors"),
  });
  console.log(data);
  return <div></div>;
};
export const MyDsicussionList = React.memo(MyDsicussion);
