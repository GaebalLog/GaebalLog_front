import type React from "react";

import useValueFormatter from "./useValueFormatter";

const useDayController = (
  type: "year" | "month" | "day",
  value: string | number,
  setValue: React.Dispatch<React.SetStateAction<string | number>>,
  yearValue?: string | number,
  monthValue?: string | number,
  dateValue?: string | number,
  setDate?: React.Dispatch<React.SetStateAction<string | number>>,
) => {
  // 증감
  const handleIncrease = () => {
    increaseSetValue[type]();
    if (type === "year") return updateDayWhenYearMonthChanges(1, 0);
    if (type === "month") return updateDayWhenYearMonthChanges(0, 1);
  };

  const handleDecrease = () => {
    decreaseSetValue[type]();
    if (type === "year") return updateDayWhenYearMonthChanges(-1, 0);
    if (type === "month") return updateDayWhenYearMonthChanges(0, -1);
  };

  const increaseSetValue = {
    year: () => setValue((prev) => +prev + 1),
    month: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    day: () => setValue((prev) => (+prev >= lastDay(0, 0) ? 1 : +prev + 1)),
  };
  const decreaseSetValue = {
    year: () =>
      setValue((prev) =>
        +prev <= new Date().getFullYear() ? prev : +prev - 1,
      ),
    month: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    day: () => setValue((prev) => (+prev <= 1 ? +lastDay(0, 0) : +prev - 1)),
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    let truncatedValue = onlyNumberValue.substring(0, 4);

    if (type === "year") return setValue(truncatedValue);

    truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (type === "month" && (+truncatedValue > 12 || +truncatedValue < 0))
      return;
    if (
      type === "day" &&
      (+truncatedValue > lastDay(0, 0) || +truncatedValue < 0)
    )
      return;
    setValue(truncatedValue + "");
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
    updateDayWhenYearMonthChanges(0, 0);
  };
  const { setDefaultIfEmpty, addZeroIfLengthOne } = useValueFormatter(
    type,
    value + "",
    setValue,
  );

  const updateDayWhenYearMonthChanges = (
    yearOffset: 0 | -1 | 1,
    monthOffset: 0 | -1 | 1,
  ) => {
    if (
      (type === "month" || type === "year") &&
      dateValue &&
      +dateValue > lastDay(yearOffset, monthOffset)
    )
      return setDate && setDate(lastDay(yearOffset, monthOffset) + "");
  };

  const lastDay = (yearOffset: 0 | -1 | 1, monthOffset: 0 | -1 | 1) => {
    return new Date(
      yearValue ? +yearValue + yearOffset : new Date().getFullYear(),
      monthValue ? +monthValue + monthOffset : new Date().getMonth() + 1,
      0,
    ).getDate();
  };

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useDayController;
