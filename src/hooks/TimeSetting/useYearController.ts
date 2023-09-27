import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

const useYearController = (time: "start" | "end") => {
  const {
    startYearValue,
    setStartYearValue,
    endYearValue,
    setEndYearValue,
    startMonthValue,
    endMonthValue,
    startDateValue,
    setStartDateValue,
    endDateValue,
    setEndDateValue,
  } = React.useContext(TimeContext);

  const isStart = time === "start";
  const yearValue = isStart ? startYearValue : endYearValue;
  const setYearValue = isStart ? setStartYearValue : setEndYearValue;
  const monthValue = isStart ? startMonthValue : endMonthValue;
  const dateValue = isStart ? startDateValue : endDateValue;
  const setDateValue = isStart ? setStartDateValue : setEndDateValue;

  // 증감
  const handleIncrease = () => {
    setYearValue((prev) => +prev + 1);
    updateDayWhenYearMonthChanges(1, 0);
  };

  const handleDecrease = () => {
    setYearValue((prev) =>
      +prev <= new Date().getFullYear() ? prev : +prev - 1,
    );
    updateDayWhenYearMonthChanges(-1, 0);
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 4);
    setYearValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    updateDayWhenYearMonthChanges(0, 0);
  };

  const setDefaultIfEmpty = () => {
    if (
      +yearValue <= new Date().getFullYear() ||
      String(yearValue).length < 4
    ) {
      setYearValue(new Date().getFullYear() + "");
    }
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
    yearValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  };
};

export default useYearController;
