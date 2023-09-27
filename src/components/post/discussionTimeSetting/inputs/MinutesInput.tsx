import React from "react";

import useMinutesController from "@/hooks/TimeSetting/useMinutesController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const MinutesInput: React.FC<props> = ({ time }) => {
  const {
    minutesValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  } = useMinutesController(time);

  return (
    <DefaultNumberInput
      type="minutes"
      testId={time}
      value={minutesValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default MinutesInput;
