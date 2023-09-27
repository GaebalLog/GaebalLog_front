import React from "react";

import useDayController from "@/hooks/TimeSetting/useDayController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const DayInput: React.FC<props> = ({ time }) => {
  const {
    dateValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  } = useDayController(time);

  return (
    <DefaultNumberInput
      testId={time}
      type="day"
      value={dateValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default DayInput;
