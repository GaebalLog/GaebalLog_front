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
  const minutesValue = isStart ? startMinutesValue : endMinutesValue;
  const setMinutesValue = isStart ? setStartMinutesValue : setEndMinutesValue;

  // 증감
  const handleIncrease = () => {
    setMinutesValue((prev) => (+prev >= 59 ? 0 : +prev + 1));
  };

  const handleDecrease = () => {
    setMinutesValue((prev) => (+prev <= 0 ? 59 : +prev - 1));
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
    setMinutesValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    if (minutesValue === "") setMinutesValue("00");
  };
  const addZeroIfLengthOne = () => {
    if (String(minutesValue).length === 1) setMinutesValue(`0${minutesValue}`);
  };

  return {
    minutesValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  };
};

export default useMinutesController;
