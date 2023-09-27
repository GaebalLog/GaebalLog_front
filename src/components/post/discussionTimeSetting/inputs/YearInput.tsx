import React from "react";

import useYearController from "@/hooks/TimeSetting/useYearController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const YearInput: React.FC<props> = ({ time }) => {
  const {
    yearValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  } = useYearController(time);

  return (
    <DefaultNumberInput
      testId={time}
      type={"year"}
      value={yearValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default YearInput;
