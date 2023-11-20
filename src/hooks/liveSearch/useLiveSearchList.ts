import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/config/query_config";
import { authAPI } from "@/config/api/authAPI";

import useDebounce from "../useDebounce";

const useLiveSearchList = (
  type: "keywordSearch" | "headerSearch" | "mypageSearch",
  value: string,
  data?: string[],
) => {
  const [displayedResults, setDisplayedResults] = React.useState([""]);
  const debouncedValue = useDebounce(value);

  useQuery({
    queryKey: [QUERY_KEYS.LIVESEARCH, debouncedValue],
    queryFn: async () => await authAPI.liveSearchKeyword(debouncedValue),
    onSuccess: (data) => setDisplayedResults(data.data),
    enabled: type !== "mypageSearch",
  });

  React.useEffect(() => {
    if (data) {
      let filteredResult;
      if (value) {
        filteredResult = data.filter((item) => item.includes(value));
      } else {
        filteredResult = [""];
      }

      setDisplayedResults(filteredResult);
    }
  }, [value]);

  return { displayedResults };
};

export default useLiveSearchList;
