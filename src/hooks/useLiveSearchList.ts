import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useDebounce from "./useDebounce";

const useLiveSearchList = (
  type: "keywordSearch" | "headerSearch" | "mypageSearch",
  value?: string | number,
  data?: string[],
) => {
  const [displayedResults, setDisplayedResults] = React.useState([""]);
  const debouncedValue = useDebounce(value + "");

  useQuery({
    queryKey: ["liveSearch", debouncedValue],
    queryFn: () => axios.get(`/api/liveSearch?value=${debouncedValue}`),
    onSuccess: (data) => setDisplayedResults(data.data),
    enabled: type !== "mypageSearch",
  });

  React.useEffect(() => {
    if (data) {
      const filteredResult = data?.filter((item) => item.includes(value + ""));
      setDisplayedResults(filteredResult);
    }
  }, [value]);

  return { displayedResults };
};

export default useLiveSearchList;
