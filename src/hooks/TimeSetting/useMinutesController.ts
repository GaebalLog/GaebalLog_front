import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

const useMinutesController = (time: "start" | "end") => {
  const {
    startMinutesValue,
    setStartMinutesValue,
    endMinutesValue,
    setEndMinutesValue,
  } = React.useContext(TimeContext);

  const isStart = time === "start";
  const isEnd = time === "end";

  // 증감
  const handleIncrease = () => {
    if (isStart) {
      return setStartMinutesValue((prev) => (+prev >= 59 ? 0 : +prev + 1));
    } else return setEndMinutesValue((prev) => (+prev >= 59 ? 0 : +prev + 1));
  };

  const handleDecrease = () => {
    if (isStart) {
      return setStartMinutesValue((prev) => (+prev <= 0 ? 59 : +prev - 1));
    } else return setEndMinutesValue((prev) => (+prev <= 0 ? 59 : +prev - 1));
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (+truncatedValue > 59 || +truncatedValue < 0) return;
    if (isStart) return setStartMinutesValue(truncatedValue);
    else return setEndMinutesValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    if (isStart && startMinutesValue === "") {
      return setStartMinutesValue("00");
    }
    if (isEnd && endMinutesValue === "") {
      return setEndMinutesValue("00");
    }
  };
  const addZeroIfLengthOne = () => {
    if (isStart && String(startMinutesValue).length === 1) {
      return setStartMinutesValue(`0${startMinutesValue}`);
    } else if (isEnd && String(endMinutesValue).length === 1) {
      return setEndMinutesValue(`0${endMinutesValue}`);
    }
  };

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useMinutesController;
