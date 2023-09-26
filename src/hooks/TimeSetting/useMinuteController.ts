import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

import useValueFormatter from "./useValueFormatter";

const useMinuteController = (
  time: "start" | "end",
  type: "hour" | "minutes",
) => {
  const {
    setStartHourValue,
    setStartMinutesValue,
    setEndHourValue,
    setEndMinutesValue,
  } = React.useContext(TimeContext);

  // 증감
  const handleIncrease = () => {
    increaseSetValue[type]();
  };

  const handleDecrease = () => {
    decreaseSetValue[type]();
  };

  const increaseSetValue = {
    hour: () => {
      if (time === "start") {
        setStartHourValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
      } else setEndHourValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
    },
    minutes: () => {
      if (time === "start") {
        setStartMinutesValue((prev) => (+prev >= 59 ? 0 : +prev + 1));
      } else setEndMinutesValue((prev) => (+prev >= 59 ? 0 : +prev + 1));
    },
  };
  const decreaseSetValue = {
    hour: () => {
      if (time === "start") {
        setStartHourValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
      } else setEndHourValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
    },
    minutes: () => {
      if (time === "start") {
        setStartHourValue((prev) => (+prev <= 0 ? 59 : +prev - 1));
      } else setEndHourValue((prev) => (+prev <= 0 ? 59 : +prev - 1));
    },
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (type === "hour" && (+truncatedValue > 12 || +truncatedValue < 0))
      return;
    if (type === "minutes" && (+truncatedValue > 59 || +truncatedValue < 0))
      return;
    if (time === "start") 
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const { setDefaultIfEmpty, addZeroIfLengthOne } = useValueFormatter(
    type,
    value + "",
    setValue,
  );

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useMinuteController;
