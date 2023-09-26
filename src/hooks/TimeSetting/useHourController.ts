import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

const useHourController = (time: "start" | "end") => {
  const { startHourValue, setStartHourValue, endHourValue, setEndHourValue } =
    React.useContext(TimeContext);

  const isStart = time === "start";
  const isEnd = time === "end";

  // 증감
  const handleIncrease = () => {
    if (isStart) {
      return setStartHourValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
    } else return setEndHourValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
  };

  const handleDecrease = () => {
    if (isStart) {
      return setStartHourValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
    } else return setEndHourValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (+truncatedValue > 12 || +truncatedValue < 0) return;
    if (isStart) return setStartHourValue(truncatedValue);
    else return setEndHourValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    if (isStart && startHourValue === "") {
      return setStartHourValue("12");
    }
    if (isEnd && endHourValue === "") {
      return setEndHourValue("12");
    }
  };
  const addZeroIfLengthOne = () => {
    if (isStart && String(startHourValue).length === 1) {
      return setStartHourValue(`0${startHourValue}`);
    } else if (isEnd && String(endHourValue).length === 1) {
      return setEndHourValue(`0${endHourValue}`);
    }
  };

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useHourController;
