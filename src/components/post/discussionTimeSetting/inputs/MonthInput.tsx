import React from "react";

import useMonthController from "@/hooks/TimeSetting/useMonthController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const MonthInput: React.FC<props> = ({ time }) => {
  const {
    monthValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  } = useMonthController(time);

  return (
    <DefaultNumberInput
      testId={time}
      type="month"
      value={monthValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default MonthInput;
