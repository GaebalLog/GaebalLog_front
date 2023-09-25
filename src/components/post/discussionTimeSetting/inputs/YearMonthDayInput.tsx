import React from "react";

import useYearMonthDayController from "@/hooks/TimeSetting/useYearMonthDayController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  testId: "start" | "end";
  type: "year" | "month" | "days";
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  yearValue?: string | number;
  monthValue?: string | number;
  dateValue?: string | number;
  setDate?: React.Dispatch<React.SetStateAction<string | number>>;
}

const YearMonthDayInput: React.FC<props> = ({
  testId,
  type,
  value,
  setValue,
  yearValue,
  monthValue,
  dateValue,
  setDate,
}) => {
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useYearMonthDayController(
      type,
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
      type={type}
      value={value}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default YearMonthDayInput;
