import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";
import TimeSettingManager from "@/utils/util-timeSettingManager";

const { startTimeMonth, endTimeMonth } = new TimeSettingManager();

const useMonthController = (time: "start" | "end") => {
  const {
    startYearValue,
    endYearValue,
    startMonthValue,
    setStartMonthValue,
    endMonthValue,
    setEndMonthValue,
    startDateValue,
    setStartDateValue,
    endDateValue,
    setEndDateValue,
  } = React.useContext(TimeContext);

  const isStart = time === "start";
  const initialMonth = isStart ? startTimeMonth : endTimeMonth;
  const yearValue = isStart ? startYearValue : endYearValue;
  const monthValue = isStart ? startMonthValue : endMonthValue;
  const setMonthValue = isStart ? setStartMonthValue : setEndMonthValue;
  const dateValue = isStart ? startDateValue : endDateValue;
  const setDateValue = isStart ? setStartDateValue : setEndDateValue;

  // 증감
  const handleIncrease = () => {
    setMonthValue((prev) => (+prev >= 12 ? 1 : +prev + 1));
    updateDayWhenYearMonthChanges(0, 1);
  };

  const handleDecrease = () => {
    setMonthValue((prev) => (+prev <= 1 ? 12 : +prev - 1));
    updateDayWhenYearMonthChanges(0, -1);
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
    setMonthValue(truncatedValue + "");
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
    updateDayWhenYearMonthChanges(0, 0);
  };

  const setDefaultIfEmpty = () => {
    if (monthValue === "") setMonthValue(initialMonth);
  };

  const addZeroIfLengthOne = () => {
    if (String(monthValue).length === 1) setMonthValue(`0${monthValue}`);
  };

  const updateDayWhenYearMonthChanges = (
    yearOffset: 0 | -1 | 1,
    monthOffset: 0 | -1 | 1,
  ) => {
    if (+dateValue > lastDay(yearOffset, monthOffset))
      return setDateValue(lastDay(yearOffset, monthOffset) + "");
  };

  const lastDay = (yearOffset: 0 | -1 | 1, monthOffset: 0 | -1 | 1) => {
    return new Date(
      yearValue ? +yearValue + yearOffset : new Date().getFullYear(),
      monthValue ? +monthValue + monthOffset : new Date().getMonth() + 1,
      0,
    ).getDate();
  };

  return {
    monthValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  };
};

export default useMonthController;
