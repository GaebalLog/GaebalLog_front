import React from "react";

import useYearMonthDayController from "@/hooks/TimeSetting/useYearController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  testId: "start" | "end";
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  yearValue?: string | number;
  monthValue?: string | number;
  dateValue?: string | number;
  setDate?: React.Dispatch<React.SetStateAction<string | number>>;
}

const YearInput: React.FC<props> = ({
  testId,
  value,
  setValue,
  yearValue,
  monthValue,
  dateValue,
  setDate,
}) => {
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useYearMonthDayController(
      "year",
      value + "",
      setValue,
      yearValue + "",
      monthValue + "",
      dateValue + "",
      setDate,
    );

  return (
    <DefaultNumberInput
      testId={testId}
      type={"year"}
      value={value}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default YearInput;
