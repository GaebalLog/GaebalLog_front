import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";
import TimeSettingManager from "@/utils/util-timeSettingManager";

const { startDateDate, endDateDate } = new TimeSettingManager();

const useDayController = (time: "start" | "end") => {
  const {
    startYearValue,
    endYearValue,
    startMonthValue,
    endMonthValue,
    startDateValue,
    setStartDateValue,
    endDateValue,
    setEndDateValue,
  } = React.useContext(TimeContext);

  const isStart = time === "start";
  const initialDate = isStart ? startDateDate : endDateDate;
  const yearValue = isStart ? startYearValue : endYearValue;
  const monthValue = isStart ? startMonthValue : endMonthValue;
  const dateValue = isStart ? startDateValue : endDateValue;
  const setDateValue = isStart ? setStartDateValue : setEndDateValue;

  // 증감
  const handleIncrease = () => {
    setDateValue((prev) => (+prev >= lastDay(0, 0) ? 1 : +prev + 1));
  };

  const handleDecrease = () => {
    setDateValue((prev) => (+prev <= 1 ? +lastDay(0, 0) : +prev - 1));
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (+truncatedValue > lastDay(0, 0) || +truncatedValue < 0) return;
    setDateValue(truncatedValue + "");
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    if (dateValue === "") setDateValue(initialDate);
  };
  const addZeroIfLengthOne = () => {
    if (String(dateValue).length === 1) setDateValue(`0${dateValue}`);
  };

  const lastDay = (yearOffset: 0 | -1 | 1, monthOffset: 0 | -1 | 1) => {
    return new Date(
      yearValue ? +yearValue + yearOffset : new Date().getFullYear(),
      monthValue ? +monthValue + monthOffset : new Date().getMonth() + 1,
      0,
    ).getDate();
  };

  return {
    dateValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  };
};

export default useDayController;
