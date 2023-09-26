import React from "react";

import useHourMinuteController from "@/hooks/TimeSetting/useHourController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const MinutesInput: React.FC<props> = ({ time }) => {
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useHourMinuteController(time, "minutes");

  return (
    <DefaultNumberInput
      type="minutes"
      value={value}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default MinutesInput;
