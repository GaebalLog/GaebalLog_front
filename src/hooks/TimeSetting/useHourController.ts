import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

const useHourController = (time: "start" | "end") => {
  const { startHourValue, setStartHourValue, endHourValue, setEndHourValue } =
    React.useContext(TimeContext);

  const isStart = time === "start";
  const hourValue = isStart ? startHourValue : endHourValue;
  const setHourValue = isStart ? setStartHourValue : setEndHourValue;

  // 증감
  const handleIncrease = () => {
    setHourValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
  };

  const handleDecrease = () => {
    setHourValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
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
    setHourValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    if (hourValue === "") setHourValue("12");
  };
  const addZeroIfLengthOne = () => {
    if (String(hourValue).length === 1) setHourValue(`0${hourValue}`);
  };

  return {
    hourValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  };
};

export default useHourController;
